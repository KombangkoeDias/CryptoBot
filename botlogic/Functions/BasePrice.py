
from flask import request

def BasePriceFunc(EverydayPrice):
    symbol = request.args.get('symbol')
    x = EverydayPrice.find_one({'symbol': symbol})
    return {'price': x['price']}