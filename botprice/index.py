import flask
from flask_cors import CORS, cross_origin
from Functions.CoinInfo import CoinInfoFunc


app = flask.Flask(__name__)
app.config['DEBUG'] = True
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'


@app.route('/ping', methods=['GET'])
@cross_origin()
def ping():
    return "pong"

# Watch List

@app.route('/coin/info', methods=['GET'])
@cross_origin()
def CoinInfo():
    return CoinInfoFunc()

app.run(host="0.0.0.0", port=8080)
