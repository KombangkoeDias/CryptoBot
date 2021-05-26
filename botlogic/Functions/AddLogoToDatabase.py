from Controller.DatabaseConnector import Logos
from Functions.getlogo import getLogo
from Coin.coin import Coin
from flask import request


def AddLogoFunc():
    request.get_data()
    symbol = request.json.get('symbol')
    logo = Logos.find_one({"symbol": symbol})
    coin = Coin(symbol)
    if logo is None:
        logo = getLogo(coin.abbr)
        Logos.insert_one({"symbol": symbol, "logo": logo})
        return {'add': True, 'logo': logo}
    else:
        return {'add': False, 'logo': logo}