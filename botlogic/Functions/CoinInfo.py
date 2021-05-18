from Coin.coin import Coins
from flask import request


def CoinInfoFunc():
    symbol = request.args.get('symbol')
    this_coin = Coins[symbol]
    this_coin.getCurrentPrice()
    this_coin.getBasePrice()
    this_coin.calculatePercentage()

    return {'basePrice': this_coin.basePrice, 'priceNow': this_coin.priceNow, 'percentage': this_coin.percentage, 'side':this_coin.side,
            'percentage_range': this_coin.percentageReached.getPercentageRange(), 'price_range': this_coin.getPriceRange()}