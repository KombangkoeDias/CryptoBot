import pymongo
import datetime

client = pymongo.MongoClient("mongodb+srv://kbd:kbd@cryptodatabase.04g9w.mongodb.net/test")

db = client['cryptoDatabase']

EverydayPriceDB = db['EverydayPrice']

BotPort = db['BotPort']

BotTransaction = db['BotTransaction']

BotProfit = db['BotProfit']

RealPort = db['RealPort']

RealTransaction = db['RealTransaction']

RealProfit = db['RealProfit']

WatchList = db['WatchList']

Logos = db['Logos']

def getTimeNow():
    x = datetime.datetime.now()
    return x.strftime('%Y-%m-%d %H:%M:%S')

def AddOrUpdate(symbol, price):
    x = EverydayPriceDB.find_one({"symbol": symbol})
    if x is not None:
        EverydayPriceDB.update_one({"symbol": symbol}, {"$set": {"price": price, "last_update": getTimeNow()}})
    else:
        EverydayPriceDB.insert_one({"symbol": symbol, "price": price, "last_update": getTimeNow()})

def Remove(symbol):
    x = EverydayPriceDB.find_one({'symbol': symbol})
    if x is not None:
        EverydayPriceDB.delete_one({'symbol': symbol})