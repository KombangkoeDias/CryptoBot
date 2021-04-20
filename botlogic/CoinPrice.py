from flask import request
from Coin.Coin import Coin
def CoinPriceFunc():
    symbol = request.args.get('symbol')
    exchange = request.args.get('exchange')
    coin = Coin(symbol, exchange)
    return coin.getPrice()