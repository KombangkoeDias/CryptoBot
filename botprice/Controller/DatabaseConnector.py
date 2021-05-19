import pymongo

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