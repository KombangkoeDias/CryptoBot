import pymongo

client = pymongo.MongoClient("mongodb+srv://kbd:kbd@cryptodatabase.04g9w.mongodb.net/test")

db = client['cryptoDatabase']

EverydayPriceDB = db['EverydayPrice']