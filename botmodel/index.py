import flask
from flask_cors import CORS, cross_origin
from LSTM import LSTMFunc

app = flask.Flask(__name__)
app.config['DEBUG'] = True
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'


@app.route('/ping', methods=['GET'])
@cross_origin()
def ping():
    return "pong"

@app.route('/LSTM', methods=['GET'])
@cross_origin()
def LSTM():
    return LSTMFunc()


app.run(host="0.0.0.0", port=5000)