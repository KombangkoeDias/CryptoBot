from Controller.DatabaseConnector import EverydayPriceDB

def EverydayPriceFunc():
    res = dict()
    x = EverydayPriceDB.find()
    for val in x:
        res[val['symbol']] = val['price']
    return res