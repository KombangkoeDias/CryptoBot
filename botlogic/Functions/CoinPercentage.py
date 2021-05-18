from ..Coin.coin import Coins
from flask import request


def CoinPercentageFunc():
    symbol = request.args.get('symbol')
    Coins[symbol].getCurrentPrice()
    Coins[symbol].getBasePrice()
    Coins[symbol].calculatePercentage()
    return {'side': Coins[symbol].side, 'percentage': Coins[symbol].percentage}