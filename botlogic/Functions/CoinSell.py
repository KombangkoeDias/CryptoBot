from flask import request
from Controller.DatabaseConnector import BotPort, BotProfit
from Controller.CreateTransaction import CreateTransaction
from Coin.coin import Coin

def CoinSellFunc():
    request.get_data()
    symbol = request.form.get('symbol')
    amount = float(request.form.get('amount'))
    exchange = request.form.get('exchange')
    coin = Coin(symbol, exchange)
    sell_price = coin.getCurrentPrice()
    if sell_price == 0:
        return {'error': 'can\'t sell, exchange not correct'}
    value = BotPort.find_one({'symbol': symbol})
    CreateTransaction(symbol, amount, sell_price, 'sell')
    if value is None or amount > float(value['amount']):
        raise ValueError('Not enough coin amount, can\'t sell')
    else:
        currAmount = float(value['amount'])
        currAverageBuy = float(value['average_buy'])
        BotPort.update_one({'symbol': symbol}, {'$set': {'amount': currAmount - amount, 'average_buy': currAverageBuy}})
        CalculateProfit(symbol, currAverageBuy, sell_price, amount)
    value = BotPort.find_one({'symbol': symbol})
    return {'symbol': value['symbol'], 'amount': value['amount'], 'average_buy': value['average_buy'], "sell_price": sell_price}

def CalculateProfit(symbol, currAverageBuy, sell_price, amount):
    profit = (sell_price - currAverageBuy) * amount
    currProfit = BotProfit.find_one({'symbol': symbol})
    if currProfit is None:
        BotProfit.insert_one({'symbol': symbol, 'profit': profit})
    else:
        BotProfit.update_one({'symbol': symbol}, {"$set": {'profit': profit + float(currProfit['profit'])}})
