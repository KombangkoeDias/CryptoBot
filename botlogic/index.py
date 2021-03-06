import flask
from flask_cors import CORS, cross_origin
from Functions.Port import CoinBuyFunc, CoinSellFunc, CoinTradeDataFunc, AllCoinTradeDataFunc, PortRemoveFunc
from Functions.CheckIfExist import CheckIfExistFunc
from Functions.WatchList import AddCoinToWatchList, RemoveCoinFromWatchList, getWatchList
from Functions.getBalance.pancake import PancakeFunc
from Functions.AddLogoToDatabase import AddLogoFunc
from Functions.getlogo import getLogoFunc


app = flask.Flask(__name__)
app.config['DEBUG'] = True
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'


@app.route('/ping', methods=['GET'])
@cross_origin()
def ping():
    return "pong"

#Watch List

@app.route('/watchlist/add', methods=['POST'])
@cross_origin()
def CoinWatchListAdd():
    return AddCoinToWatchList()

@app.route('/watchlist/remove', methods=['POST'])
@cross_origin()
def CoinWatchListRemove():
    return RemoveCoinFromWatchList()

@app.route('/watchlist/get', methods=['GET'])
@cross_origin()
def CoinWatchListGet():
    return getWatchList()
#Coin


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

@app.route('/port/trade_data/all', methods=['POST'])
@cross_origin()
def GetAllCoinTradeData():
    return AllCoinTradeDataFunc()

@app.route('/port/remove', methods=['POST'])
@cross_origin()
def remove():
    return PortRemoveFunc()

@app.route('/coin/checkIfExist', methods=['POST'])
@cross_origin()
def CheckIfExist():
    return CheckIfExistFunc()

# Logo
@app.route('/logo/add', methods=['POST'])
@cross_origin()
def addLogo():
    return AddLogoFunc()

@app.route('/coin/logo', methods=['GET'])
@cross_origin()
def getLogo():
    return getLogoFunc()

# Balance
@app.route('/balance/pancake', methods=['GET'])
@cross_origin()
def pancake():
    return PancakeFunc()
app.run(host="0.0.0.0", port=5000)

