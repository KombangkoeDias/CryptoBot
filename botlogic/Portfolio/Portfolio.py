from datetime import datetime
from Coin.coin import Coin
from Controller.DatabaseConnector import BotPort, BotProfit, BotTransaction, RealPort, RealProfit, RealTransaction
from flask import request

class Portfolio:
    def __init__(self, PortDB, ProfitDB, TransactionDB):
        self.PortDB = PortDB
        self.ProfitDB = ProfitDB
        self.TransactionDB = TransactionDB

    def createTransaction(self, symbol, amount, price, side):
        value = self.TransactionDB.find_one({'symbol': symbol})
        if side == 'buy':
            newTransaction = {'amount': amount, 'buy_price': price,
                              'transaction_time': datetime.now().strftime('%-d/%-m/%Y %-H:%M:%-S')}
        elif side == 'sell':
            newTransaction = {'amount': amount, 'sell_price': price,
                              'transaction_time': datetime.now().strftime('%-d/%-m/%Y %-H:%M:%-S')}
        else:
            raise ValueError('buy or sell only')
        if value is None:
            if side == 'buy':
                self.TransactionDB.insert_one({'symbol': symbol, 'transactions': {'buy': [newTransaction], 'sell': []}})
            else:
                self.TransactionDB.insert_one({'symbol': symbol, 'transactions': {'buy': [], 'sell': [newTransaction]}})
        else:
            transactions = value['transactions']
            transactions[side].append(newTransaction)
            self.TransactionDB.update_one({'symbol': symbol}, {"$set": {'transactions': transactions}})

    def buyCoin(self, _symbol, amount ,exchange):
        coin = Coin(_symbol, exchange)
        buy_price = request.json.get('buy_price')
        if buy_price == None:
            buy_price = coin.getCurrentPrice()
        symbol = coin.symbolWithNoUnderscore
        if buy_price == 0:
            return {'error': 'can\'t buy, exchange not correct'}
        value = self.PortDB.find_one({'symbol': symbol})
        self.createTransaction(symbol, amount, buy_price, 'buy')
        if value is None:
            self.PortDB.insert_one({'symbol': symbol, 'amount': amount, 'average_buy': buy_price})
        else:
            currAmount = float(value['amount'])
            currAverageBuy = float(value['average_buy'])
            self.PortDB.update_one({'symbol': symbol}, {'$set': {'amount': currAmount + amount, 'average_buy': (currAverageBuy * currAmount + buy_price * amount) / (currAmount + amount)}})
        value = self.PortDB.find_one({'symbol': symbol})
        return {'symbol': value['symbol'], 'amount': value['amount'], 'average_buy': value['average_buy'],
                "buy_price": buy_price}
    def sellCoin(self, _symbol, amount, exchange):
        coin = Coin(_symbol, exchange)
        sell_price = request.json.get('sell_price')
        if sell_price == None:
            sell_price = coin.getCurrentPrice()
        symbol = coin.symbolWithNoUnderscore
        if sell_price == 0:
            return {'error': 'can\'t sell, exchange not correct'}
        value = self.PortDB.find_one({'symbol': symbol})
        self.createTransaction(symbol, amount, sell_price, 'sell')
        if value is None or amount > float(value['amount']):
            raise ValueError('Not enough coin amount, can\'t sell')
        else:
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
            res_port = {'symbol': symbol, 'amount': 0, 'average_buy': 0}
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

BotPortfolio = Portfolio(BotPort, BotProfit, BotTransaction)
RealPortfolio = Portfolio(RealPort, RealProfit, RealTransaction)