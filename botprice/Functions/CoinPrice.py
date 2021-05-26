from Coin.coin import Coin
from flask import request

def CoinPriceFunc():
    symbol = request.args.get('symbol')
    exchange = request.args.get('exchange')
    coin = Coin(symbol, exchange)
    return {'price': coin.getCurrentPrice()}