from datetime import datetime
from Coin.coin import Coin
from Controller.DatabaseConnector import BotPort, BotProfit, BotTransaction, RealPort, RealProfit, RealTransaction, Logos
from flask import request
from Functions.getlogo import getLogo

class Portfolio:
    def __init__(self, PortDB, ProfitDB, TransactionDB):
        self.PortDB = PortDB
        self.ProfitDB = ProfitDB
        self.TransactionDB = TransactionDB

    def createTransaction(self, symbol, amount, price, side, exchange):
        value = self.TransactionDB.find_one({'symbol': symbol, 'exchange': exchange})
        if side == 'buy':
            newTransaction = {'amount': amount, 'buy_price': price,
                              'transaction_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')+'.0'}
        elif side == 'sell':
            newTransaction = {'amount': amount, 'sell_price': price,
                              'transaction_time': datetime.now().strftime('%Y-%m-%d %H:%M:%S')+'.0'}
        else:
            raise ValueError('buy or sell only')
        if value is None:
            if side == 'buy':
                self.TransactionDB.insert_one({'symbol': symbol, 'exchange': exchange, 'transactions': {'buy': [newTransaction], 'sell': []}})
            else:
                self.TransactionDB.insert_one({'symbol': symbol, 'exchange': exchange, 'transactions': {'buy': [], 'sell': [newTransaction]}})
        else:
            transactions = value['transactions']
            transactions[side].append(newTransaction)
            self.TransactionDB.update_one({'symbol': symbol}, {"$set": {'transactions': transactions}})

    def buyCoin(self, symbol, amount ,exchange):
        coin = Coin(symbol, exchange)
        buy_price = request.json.get('buy_price')
        if buy_price == "":
            buy_price = coin.getCurrentPrice()
        else:
            buy_price = float(buy_price)
        if buy_price == 0:
            return {'error': 'can\'t buy, exchange not correct'}
        value = self.PortDB.find_one({'symbol': symbol})
        self.createTransaction(symbol, amount, buy_price, 'buy', exchange)
        if value is None:
            logo = Logos.find_one({'symbol': symbol})
            if logo is None:
                logo = getLogo(coin.abbr)
            else:
                logo = logo['logo']
            self.PortDB.insert_one({'symbol': symbol, 'amount': amount, 'exchange': exchange, 'average_buy': buy_price, 'logo': logo})
        else:
            currAmount = float(value['amount'])
            currAverageBuy = float(value['average_buy'])
            self.PortDB.update_one({'symbol': symbol}, {'$set': {'amount': currAmount + amount, 'average_buy': (currAverageBuy * currAmount + buy_price * amount) / (currAmount + amount)}})
        value = self.PortDB.find_one({'symbol': symbol})
        return {'symbol': value['symbol'], 'amount': value['amount'], 'average_buy': value['average_buy'],
                "buy_price": buy_price}
    def sellCoin(self, symbol, amount, exchange):
        coin = Coin(symbol, exchange)
        sell_price = request.json.get('sell_price')
        if sell_price == "":
            sell_price = coin.getCurrentPrice()
        else:
            sell_price = float(sell_price)
        if sell_price == 0:
            return {'error': 'can\'t sell, exchange not correct'}
        value = self.PortDB.find_one({'symbol': symbol})
        if value is None or amount > float(value['amount']):
            return {"error": 'can\'t sell, not enough coin'}
        else:
            self.createTransaction(symbol, amount, sell_price, 'sell',exchange)
            currAmount = float(value['amount'])
            currAverageBuy = float(value['average_buy'])
            self.PortDB.update_one({'symbol': symbol},
                               {'$set': {'amount': currAmount - amount, 'average_buy': currAverageBuy}})
            self.calculateProfit(symbol, currAverageBuy, sell_price, amount)
        value = self.PortDB.find_one({'symbol': symbol})
        return {'symbol': value['symbol'], 'amount': value['amount'], 'average_buy': value['average_buy'],
                "sell_price": sell_price}
    def calculateProfit(self, symbol, currAverageBuy, sell_price, amount):
        profit = (sell_price - currAverageBuy) * amount
        currProfit = self.ProfitDB.find_one({'symbol': symbol})
        if currProfit is None:
            self.ProfitDB.insert_one({'symbol': symbol, 'profit': profit})
        else:
            self.ProfitDB.update_one({'symbol': symbol}, {"$set": {'profit': profit + float(currProfit['profit'])}})

    def getTradeData(self, symbol):
        Port = self.PortDB.find_one({'symbol': symbol})
        if Port is None:
            res_port = {'symbol': symbol, 'amount': 0, 'average_buy': 0, 'logo': None, 'exchange': None}
        else:
            res_port = Port
        Transactions = self.TransactionDB.find_one({'symbol': symbol})
        if Transactions is None:
            res_transactions = {'symbol': symbol, 'transactions': {'buy': [], 'sell': []}}
        else:
            res_transactions = Transactions
        Profit = self.ProfitDB.find_one({'symbol': symbol})
        if Profit is None:
            res_profit = {'symbol': symbol, 'profit': 0}
        else:
            res_profit = Profit
        for key in ['_id']:
            if key in res_port.keys():
                del res_port[key]
            if key in res_transactions.keys():
                del res_transactions[key]
            if key in res_profit.keys():
                del res_profit[key]
        return {'symbol': symbol, 'port': res_port, 'transactions': res_transactions, 'profit': res_profit}

    def getAllTradeData(self):
        Port = self.PortDB.find()
        Transactions = self.TransactionDB.find()
        Profit = self.ProfitDB.find()
        PortDict = dict()
        TransactionDict = dict()
        ProfitDict = dict()
        symbols = list()
        for port in Port:
            PortDict[port['symbol']] = port
            symbols.append(port['symbol'])
        for transaction in Transactions:
            TransactionDict[transaction['symbol']] = transaction
        for symbol in symbols:
            if symbol not in ProfitDict.keys():
                ProfitDict[symbol] = {'symbol': symbol, 'profit': 0}
            else:
                ProfitDict[symbol] = ProfitDict[symbol]
        res = []
        for symbol in symbols:
            res_dict = dict()
            for key in ['_id']:
                if key in PortDict[symbol].keys():
                    del PortDict[symbol][key]
                if key in TransactionDict[symbol].keys():
                    del TransactionDict[symbol][key]
                if key in ProfitDict[symbol].keys():
                    del ProfitDict[symbol][key]
            res_dict['port'] = PortDict[symbol]
            res_dict['transactions'] = TransactionDict[symbol]
            res_dict['profit'] = ProfitDict[symbol]
            res_dict['symbol'] = symbol
            res.append(res_dict)
        if (len(res) == 0):
            res = [None]
        return {"trade_data": res}

    def clear(self):
        try:
            self.PortDB.remove()
            self.TransactionDB.remove()
            self.ProfitDB.remove()
            return {'removed': True}
        except:
            return {'removed': False}

BotPortfolio = Portfolio(BotPort, BotProfit, BotTransaction)
RealPortfolio = Portfolio(RealPort, RealProfit, RealTransaction)