import flask
from flask_cors import CORS, cross_origin
from Functions.EverydayPrice import EverydayPriceFunc
from Functions.CoinPrice import CoinPriceFunc
from Functions.BasePrice import BasePriceFunc
from Functions.CoinPercentage import CoinPercentageFunc
from Functions.CoinInfo import CoinInfoFunc

app = flask.Flask(__name__)
app.config['DEBUG'] = True
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'


@app.route('/EverydayPrice', methods=['GET'])
@cross_origin()
def EverydayPrice():
    return EverydayPriceFunc()

@app.route("/basePrice", methods=['GET'])
@cross_origin()
def getBasePrice():
    return BasePriceFunc()

@app.route('/coin/price', methods=['GET'])
@cross_origin()
def CoinPrice():
    return CoinPriceFunc()

@app.route('/coin/percentage', methods=['GET'])
@cross_origin()
def CoinPercentage():
    return CoinPercentageFunc()

@app.route('/coin/info', methods=['GET'])
@cross_origin()
def CoinInfo():
    return CoinInfoFunc()

app.run()

