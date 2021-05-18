from flask import request
from ..Coin.coin import Coin

def CheckIfExistFunc():
    request.get_data()
    symbol = request.json.get('symbol')
    exchange = request.json.get('exchange')
    print(symbol, exchange, flush=True)
    if symbol is None or exchange is None:
        return {'exist': False}
    coin = Coin(symbol, exchange)
    price = coin.getCurrentPrice()
    if price == 0:
        return {'exist': False}
    else:
        return {'exist': True}