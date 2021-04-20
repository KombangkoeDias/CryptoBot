import requests
import json

class Coin:
    def __init__(self, symbol, exchange='binance'):
        self.symbol = symbol
        self.exchange =exchange

    def getPrice(self):
        if self.exchange == 'binance':
            respond = requests.get("https://api.binance.com/api/v3/ticker/price?symbol=" + self.symbol)
            val = json.loads(respond.text)
            return({"price": val['price']})
        elif self.exchange == 'gateio':
            respond = requests.get("https://api.gateio.ws/api/v4/spot/tickers/?currency_pair=" + self.symbol)
            val = json.loads(respond.text)
            return ({"price": val[0]['last']})
        elif self.exchange == 'bitmart':
            respond = requests.get("https://api-cloud.bitmart.com/spot/v1/ticker?symbol=" + self.symbol)
            val = json.loads(respond.text)
            return ({"price": val['data']['tickers'][0]['last_price']})
        return "no price data for this coin yet"