from flask import request
from Controller.DatabaseConnector import WatchList, AddOrUpdate, Remove
from Functions.getlogo import getLogo
from Coin.coin import Coin
from config import serverurl
import requests as rq
import json

def AddCoinToWatchList():
    request.get_data()
    symbol = request.json.get('symbol')
    exchange = request.json.get('exchange')
    sturdy = request.json.get('sturdy')
    if sturdy is None:
        sturdy = False
    notify = request.json.get('notify')
    if notify is None:
        notify = False
    amount = request.json.get('amount')
    result = rq.post(serverurl + "/coin/checkIfExist", json={'symbol': symbol, 'exchange': exchange})
    result = json.loads(result.text)
    if result['exist']:
        coin = WatchList.find_one({"symbol": symbol})
        coin_instance = Coin(symbol, exchange)
        logo = getLogo(coin_instance.abbr)
        AddOrUpdate(symbol, coin_instance.getCurrentPrice()) # add to EverydayPriceDB
        if (coin is None):
            WatchList.insert_one({'symbol': symbol, 'exchange': exchange, 'notify': notify, 'sturdy':sturdy, 'amount': amount, 'logo': logo})
            return {'symbol': symbol, 'exchange': exchange, 'notify': notify, 'sturdy': sturdy, 'amount':amount, 'inserted': True, 'logo': logo}
        else:
            return {'symbol': symbol, 'exchange': exchange, 'notify': notify, 'sturdy': sturdy, 'amount': amount, 'inserted': False, 'logo': logo}
    else:
        return {"error": f'coin {symbol} at exchange {exchange} does not exist'}

def RemoveCoinFromWatchList():
    request.get_data()
    symbol = request.json.get('symbol')
    exchange = request.json.get('exchange')
    result = WatchList.delete_one({'symbol': symbol, 'exchange': exchange})
    Remove(symbol) # remove from EverydayPriceDB
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
        #val['logo'] = coin['logo']
        res[coin['symbol']] = val
    return res
