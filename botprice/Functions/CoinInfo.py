from Coin.coin import Coin
from flask import request
from Controller.DatabaseConnector import WatchList


def CoinInfoFunc():
    symbol = request.args.get('symbol')
    exchange = request.args.get('exchange')
    coin = WatchList.find_one({'symbol': symbol, 'exchange': exchange})
    if coin is None:
        this_coin = Coin(symbol, exchange, sturdy=False, notify=False)
        this_coin.getCurrentPrice()
        this_coin.getBasePrice()
        this_coin.calculatePercentage()
    else:
        this_coin = Coin(coin['symbol'], coin['exchange'], coin['sturdy'], coin['notify'])
        this_coin.getCurrentPrice()
        this_coin.getBasePrice()
        this_coin.calculatePercentage()

    return {'basePrice': this_coin.basePrice, 'priceNow': this_coin.priceNow, 'percentage': this_coin.percentage, 'side':this_coin.side,
            #'percentage_range': this_coin.percentageReached.getPercentageRange(),
            'price_range': this_coin.getPriceRange()}