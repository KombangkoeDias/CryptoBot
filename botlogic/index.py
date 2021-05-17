import flask
from flask_cors import CORS, cross_origin
from Functions.EverydayPrice import EverydayPriceFunc
from Functions.CoinPrice import CoinPriceFunc
from Functions.BasePrice import BasePriceFunc
from Functions.CoinPercentage import CoinPercentageFunc
from Functions.CoinInfo import CoinInfoFunc
from Functions.CoinBuy import CoinBuyFunc
from Functions.CoinSell import CoinSellFunc
from Functions.CoinTradeData import CoinTradeDataFunc
from Functions.CheckIfExist import CheckIfExistFunc

app = flask.Flask(__name__)
app.config['DEBUG'] = True
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'


@app.route('/ping', methods=['GET'])
@cross_origin()
def ping():
    return "pong"

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

@app.route('/coin/buy', methods=['POST'])
@cross_origin()
def CoinBuy():
    return CoinBuyFunc()

@app.route('/coin/sell', methods=['POST'])
@cross_origin()
def CoinSell():
    return CoinSellFunc()

@app.route('/coin/trade_data', methods=['POST'])
@cross_origin()
def GetCoinTradeData():
    return CoinTradeDataFunc()

@app.route('/coin/checkIfExist', methods=['POST'])
@cross_origin()
def CheckIfExist():
    return CheckIfExistFunc()
app.run()

