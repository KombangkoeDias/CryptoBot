from Coin.notification import PercentageReached
from Coin.apiConnector import getPrice
from Controller.DatabaseConnector import EverydayPriceDB

pairs = ['USDT', 'BUSD', 'ETH', 'BTC']

class Coin:
    def __init__(self,symbol,exchange='binance',sturdy=False, notify=True):
        self.symbol = symbol
        self.abbr = ""
        self.priceNow = None
        self.percentageReached = PercentageReached(sturdy)
        self.basePrice = 0
        self.side = None
        self.percentage = 0
        self.upMax = None
        self.downMax = None
        self.exchange = exchange
        self.sturdy = sturdy
        self.wantNotify = notify
        self.symbolWithNoUnderscore = self.getSymbolWithNoUnderscore()
        self.tradingPair = self.getTradingPair()
        self.getAbbreviation()

    def getSymbolWithNoUnderscore(self):
        theSymbol = ''
        for char in self.symbol:
            if char != '_':
                theSymbol += char
        return theSymbol

    def getAbbreviation(self):
        for pair in pairs:
            if self.tradingPair == pair:
                self.abbr = self.symbol[:len(self.symbol)-len(pair)]
                break
        if(self.abbr[-1] == '_'):
            self.abbr = self.abbr[0:-1]


    def calculatePercentage(self):

        self.percentage = abs(self.priceNow - self.basePrice)/self.basePrice * 100
        self.calculatePriceRange()
        self.calculateSide()

    def calculateSide(self):
        if self.basePrice < self.priceNow:
            newside = "up"
        else:
            newside = "down"

        # clear results if side flips
        for percent in self.percentageReached.values[newside].keys():
            notified = self.percentageReached.values[newside][percent]
            if (self.percentage > percent and not notified):
                if newside == 'up' and self.side == 'down':
                    print("up to down")
                    self.percentageReached.clearPercentage("down")
                if newside == 'down' and self.side == 'up':
                    print("down to up")
                    self.percentageReached.clearPercentage("up")
            self.percentageReached.setPercentage(newside, percent, True)
        self.side = newside

    def getCurrentPrice(self):
        self.priceNow = getPrice(self.symbol,self.exchange)
        return self.priceNow

    def getPriceRange(self):
        return (self.downMax, self.upMax)

    def calculatePriceRange(self):
        if self.upMax == None:
            self.upMax = self.basePrice
        if self.downMax == None:
            self.downMax = self.basePrice
        if self.priceNow > self.upMax:
            self.upMax = self.priceNow
        if self.priceNow < self.downMax:
            self.downMax = self.priceNow

    def getPercentageRange(self):
        return self.percentageReached.getPercentageRange()

    def getBasePrice(self):
        x = EverydayPriceDB.find_one({'symbol': self.symbolWithNoUnderscore})['price']
        self.basePrice = x

    def getTradingPair(self):
        for pair in pairs:
            if (self.symbol[len(self.symbol)-len(pair):] == pair):
                return pair
    # def resetDaily(self):
    #     self.percentageReached = PercentageReached(self.sturdy)
    #     self.basePrice = getPrice(self.symbol,self.exchange)
    #     self.priceNow = getPrice(self.symbol, self.exchange)
    #     self.side = None
    #     self.percentage = 0
    #     self.upMax = None
    #     self.downMax = None


Coins = {
    "BTCUSDT": Coin("BTCUSDT"),
    "ETHUSDT": Coin("ETHUSDT"),
    "ADAUSDT": Coin("ADAUSDT"),
    "LINKUSDT": Coin("LINKUSDT"),
    "DOTUSDT": Coin("DOTUSDT"),
    "XRPUSDT": Coin("XRPUSDT"),
    "BNBUSDT": Coin("BNBUSDT"),
    "KSMUSDT": Coin("KSMUSDT"),
    "CAKEUSDT": Coin("CAKEUSDT"),
    "ONEUSDT": Coin("ONEUSDT"),
    "HOTUSDT": Coin("HOTUSDT"),
    "ZILUSDT": Coin("ZILUSDT"),
    "SXPUSDT": Coin("SXPUSDT"),
    "ATOMUSDT": Coin("ATOMUSDT"),
    "POWRBTC": Coin("POWRBTC"),
    "SOLUSDT": Coin("SOLUSDT"),
    "LITUSDT": Coin("LITUSDT"),
    "STPTUSDT": Coin("STPTUSDT"),
    "ENJUSDT": Coin("ENJUSDT"),
    "DENTUSDT": Coin("DENTUSDT"),
    "PCXUSDT": Coin("PCX_USDT", exchange='gate.io'),
    "GTUSDT": Coin("GT_USDT", exchange='gate.io'),
    "POLSUSDT": Coin("POLS_USDT", exchange='gate.io'),
    "POLKUSDT": Coin("POLK_USDT", exchange='gate.io'),
    "PKFUSDT": Coin("PKF_USDT", exchange='gate.io'),
    "KYLUSDT": Coin("KYL_USDT", exchange='gate.io'),
    "PBRUSDT": Coin("PBR_USDT", exchange='gate.io'),
    "SAFEMOONUSDT": Coin("SAFEMOON_USDT", exchange='bitmart', sturdy=True),
    "BANDUSDT": Coin("BANDUSDT", notify=False),
    "FILUSDT": Coin("FILUSDT", notify=False),
    "STORJUSDT": Coin("STORJUSDT", notify=False),
    "THETAUSDT": Coin("THETAUSDT", notify=False),
    "WANUSDT": Coin("WANUSDT", notify=False),
    "XTZUSDT": Coin("XTZUSDT", notify=False),
    "INJUSDT": Coin("INJUSDT"),
    "RINGUSDT": Coin("RING_USDT", exchange='gate.io'),
    'PHABUSD': Coin("PHABUSD"),
    "eRSDLETH": Coin("eRSDL_ETH", exchange='bitmart')
}


# ADA = Coin("ADAUSDT")
# ADA.basePrice = 1.4
# ADA.priceNow = 1.5
# ADA.calculatePercentage()
# ADA.calculatePriceRange()
# ADA.priceNow = 1.2
# ADA.calculatePercentage()
# ADA.calculatePriceRange()
# print(ADA.getPriceRange())
# print(ADA.getPercentageRange())