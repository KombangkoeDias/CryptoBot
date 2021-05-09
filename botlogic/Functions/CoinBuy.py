from flask import request
from Controller.DatabaseConnector import BotPort
from Controller.CreateTransaction import CreateTransaction

def CoinBuyFunc():
    request.get_data()
    symbol = request.form.get('symbol')
    amount = float(request.form.get('amount'))
    buy_price = float(request.form.get('buy_price'))
    value = BotPort.find_one({'symbol': symbol})
    CreateTransaction(symbol, amount, buy_price, 'buy')
    if value is None:
        BotPort.insert_one({'symbol': symbol, 'amount': amount, 'average_buy': buy_price})
    else:
        currAmount = float(value['amount'])
        currAverageBuy = float(value['average_buy'])
        BotPort.update_one({'symbol': symbol}, {'$set': {'amount': currAmount + amount, 'average_buy': (currAverageBuy*currAmount + buy_price*amount)/(currAmount + amount)}})
    value = BotPort.find_one({'symbol': symbol})
    return {'symbol': value['symbol'], 'amount': value['amount'], 'average_buy': value['average_buy']}

