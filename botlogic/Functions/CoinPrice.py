from flask import request
from Coin.coin import Coins
def CoinPriceFunc():
    symbol = request.args.get('symbol')
    return {'price': Coins[symbol].getCurrentPrice()}