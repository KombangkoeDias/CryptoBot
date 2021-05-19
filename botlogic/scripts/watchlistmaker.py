import requests as rq
from config import serverurl
from Coin.coin import Coin

Coins = {
    "BTCUSDT": Coin("BTCUSDT"),
    "ETHUSDT": Coin("ETHUSDT"),
    "ADAUSDT": Coin("ADAUSDT"),
    "LINKUSDT": Coin("LINKUSDT"),
    "DOTUSDT": Coin("DOTUSDT"),
    "BNBUSDT": Coin("BNBUSDT"),
    "KSMUSDT": Coin("KSMUSDT"),
    "CAKEUSDT": Coin("CAKEUSDT"),
    "ONEUSDT": Coin("ONEUSDT"),
    "HOTUSDT": Coin("HOTUSDT"),
    "ZILUSDT": Coin("ZILUSDT"),
    "SXPUSDT": Coin("SXPUSDT"),
    "ATOMUSDT": Coin("ATOMUSDT"),
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
    "INJUSDT": Coin("INJUSDT"),
    "RINGUSDT": Coin("RING_USDT", exchange='gate.io'),
    'PHABUSD': Coin("PHABUSD"),
    "eRSDLETH": Coin("eRSDL_ETH", exchange='bitmart')
}

CoinAmount = {
"BTCUSDT": 0,
"ETHUSDT": 0.042082,
"ADAUSDT": 712.486,
"LINKUSDT": 1.25373,
"DOTUSDT": 30.0447,
"BNBUSDT": 0.492535,
"KSMUSDT": 0.652528,
"CAKEUSDT": 14.499,
"ONEUSDT": 346.911,
"HOTUSDT": 4092,
"ZILUSDT": 189.934,
"SXPUSDT": 8.90309,
"ATOMUSDT": 4.6377,
"SOLUSDT": 10.413,
"LITUSDT": 7.507,
"STPTUSDT": 273.127,
"ENJUSDT": 10.4895,
"DENTUSDT": 4582.35,
"PCXUSDT": 4.6117,
"GTUSDT": 5.4619,
"POLSUSDT": 16.467,
"POLKUSDT": 29.94,
"PKFUSDT": 32.934,
"KYLUSDT": 34.1944,
"PBRUSDT": 131.898,
"SAFEMOONUSDT": 27357889,
"BANDUSDT": 0,
"INJUSDT": 0.76,
"RINGUSDT": 452.918,
"PHABUSD": 54.6449,
"eRSDLETH": 38,
}

for key in Coins.keys():
    print(f'"{key}": ,')

for symbol in Coins.keys():
    coin = Coins[symbol]
    rq.post(serverurl + '/watchlist/add', data={'symbol': coin.symbol,
                                                'exchange': coin.exchange,
                                                'sturdy': coin.sturdy,
                                                'notify': coin.wantNotify,
                                                'amount': CoinAmount[symbol]})