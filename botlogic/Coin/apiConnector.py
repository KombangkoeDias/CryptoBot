import requests
import json

def getPrice(symbol, exchange):
    try:
        if exchange == 'gate.io':
            host = "https://api.gateio.ws"
            prefix = "/api/v4"
            headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

            url = '/spot/tickers'
            query_param = ''
            r = requests.request('GET', host + prefix + url + "?currency_pair=" + symbol, headers=headers)
            respond = json.loads(r.text)
            if ('last' in respond[0].keys()):
                return float(respond[0]['last'])
            else:
                return 0

        elif exchange == 'binance':
            respond = requests.get("https://api.binance.com/api/v3/ticker/price?symbol="+symbol)
            respond = json.loads(respond.text)
            if ('price' in respond.keys()):
                return float(respond['price'])
            else:
                return 0
        elif exchange == 'bitmart':
            respond = requests.get("https://api-cloud.bitmart.com/spot/v1/ticker?symbol="+symbol)
            respond = json.loads(respond.text)
            if 'last_price' in respond['data']['tickers'][0].keys():
                return float(respond['data']['tickers'][0]['last_price'])
            else:
                return 0
        else:
            return 0
    except:
        return 0


def get24Ticker(symbol, exchange):
    if exchange == 'binance':
        respond = requests.get("https://api.binance.com/api/v3/ticker/24hr?symbol="+symbol)
        respond = json.loads(respond.text)
        print(respond)
    else:
        return {}