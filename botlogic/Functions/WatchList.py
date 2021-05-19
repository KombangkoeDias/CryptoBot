from flask import request
from Controller.DatabaseConnector import WatchList

def AddCoinToWatchList():
    request.get_data()
    symbol = request.form.get('symbol')
    exchange = request.form.get('exchange')
    sturdy = request.form.get('sturdy')
    notify = request.form.get('notify')
    amount = request.form.get('amount')
    coin = WatchList.find_one({"symbol": symbol})
    if (coin is None):
        WatchList.insert_one({'symbol': symbol, 'exchange': exchange, 'notify': notify, 'sturdy':sturdy, 'amount': amount})
        return {'symbol': symbol, 'exchange': exchange, 'notify': notify, 'sturdy': sturdy, 'amount':amount, 'inserted': True}
    else:
        return {'symbol': symbol, 'exchange': exchange, 'notify': notify, 'sturdy': sturdy, 'amount': amount, 'inserted': False}

def RemoveCoinFromWatchList():
    request.get_data()
    symbol = request.json.get('symbol')
    exchange = request.json.get('exchange')
    result = WatchList.delete_one({'symbol': symbol, 'exchange': exchange})
    if result.deleted_count != 0:
        return {'symbol': symbol, 'exchange': exchange, 'deleted': True}
    else:
        return {'symbol': symbol, 'exchange': exchange, 'delete': False}

def getWatchList():
    res = {}
    result = WatchList.find()
    for coin in result:
        val = {}
        val['exchange'] = coin['exchange']
        val['notify'] = coin['notify']
        val['sturdy'] = coin['sturdy']
        val['amount'] = float(coin['amount'])
        res[coin['symbol']] = val
    return res
