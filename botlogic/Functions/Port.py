from ..Portfolio.Portfolio import BotPortfolio, RealPortfolio
from flask import request
from ..Coin.coin import Coin

NoPortError = {"error": "no such port"}


def CoinBuyFunc():
    request.get_data()
    symbol = request.json.get('symbol')
    amount = float(request.json.get('amount'))
    exchange = request.json.get('exchange')
    port = request.json.get('port')
    if (port == 'real_port'):
        return RealPortfolio.buyCoin(symbol, amount, exchange)
    elif (port == 'bot_port'):
        return BotPortfolio.buyCoin(symbol, amount, exchange)
    else:
        return NoPortError

def CoinSellFunc():
    request.get_data()
    symbol = request.json.get('symbol')
    amount = float(request.json.get('amount'))
    exchange = request.json.get('exchange')
    port = request.json.get('port')
    if (port == 'real_port'):
        return RealPortfolio.sellCoin(symbol, amount, exchange)
    elif (port == 'bot_port'):
        return BotPortfolio.sellCoin(symbol, amount,exchange)
    else:
        return NoPortError

def CoinTradeDataFunc():
    request.get_data()
    symbol = request.json.get('symbol')
    port = request.json.get('port')
    symbol = Coin(symbol).getSymbolWithNoUnderscore()
    if (port == 'real_port'):
        return RealPortfolio.getTradeData(symbol)
    elif (port == 'bot_port'):
        return BotPortfolio.getTradeData(symbol)
    else:
        return NoPortError