import flask
from flask_cors import CORS, cross_origin
import pymongo
from Functions.EverydayPrice import EverydayPriceFunc
from Functions.CoinPrice import CoinPriceFunc
from Functions.BasePrice import BasePriceFunc

app = flask.Flask(__name__)
app.config['DEBUG'] = True
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'

client = pymongo.MongoClient("mongodb+srv://kbd:kbd@cryptodatabase.04g9w.mongodb.net/test")

db = client['cryptoDatabase']

EverydayPriceDB = db['EverydayPrice']

@app.route('/EverydayPrice', methods=['GET'])
@cross_origin()
def EverydayPrice():
    return EverydayPriceFunc(EverydayPriceDB)

@app.route("/basePrice", methods=['GET'])
@cross_origin()
def getBasePrice():
    return BasePriceFunc(EverydayPriceDB)

@app.route('/coin/price', methods=['GET'])
@cross_origin()
def CoinPrice():
    return CoinPriceFunc()


app.run()

