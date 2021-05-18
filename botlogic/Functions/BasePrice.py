from flask import request
from Coin.coin import Coins

def BasePriceFunc():
    symbol = request.args.get('symbol')
    Coins[symbol].getBasePrice()
    return {'price': Coins[symbol].basePrice}
