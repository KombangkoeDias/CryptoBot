import gdown
import zipfile
import requests as rq
import json
import datetime
import pandas as pd
import tensorflow as tf
from tensorflow import keras
import numpy as np

url = "https://drive.google.com/uc?id=1-70a-DgvkirsWhetfFwKoZSex7Octb0F"

output = 'models.zip'

gdown.download(url, output,quiet=False )

with zipfile.ZipFile('models.zip','r') as zip:
    zip.extractall("./models")

coins = ['ADAUSDT', 'BNBUSDT', 'BTCUSDT', 'CAKEUSDT', 'DOTUSDT', 'ETHUSDT', 'KSMUSDT',
         'MATICUSDT', 'SOLUSDT', 'VETUSDT', 'XLMUSDT']
base_url_bn = 'https://api.binance.com'

def getData(symbol, interval, limit):
  respond = rq.get(base_url_bn + "/api/v3/klines", params={'symbol': symbol, 'interval': str(interval), 'limit': str(limit)})
  respond = json.loads(respond.text)
  df = pd.DataFrame(respond)
  df.columns = ['Opentime', 'OpenPrice', 'High', 'Low', 'Close', 'Volume', 'Closetime', 'Quote asset volume', 'Number of trades','Taker by base', 'Taker buy quote', 'Ignore']
  df['Opentime'] = pd.to_datetime(df['Opentime'], unit='ms') + datetime.timedelta(hours=7)
  df = df.set_index(['Opentime'])
  floatColumns = ['OpenPrice', 'High', 'Low', 'Close', 'Volume', 'Closetime']
  for column in floatColumns:
    df[column] = df[column].astype(float)
  df = df.drop(['Quote asset volume', 'Number of trades','Taker by base', 'Taker buy quote', 'Ignore'], axis=1)
  df['Absolute Volume'] = df['Volume']*df['Close']
  return df

def calculateChange(df):
  df['change'] = (df['Close'] - df['OpenPrice'])/ df['OpenPrice'] * 100
  return df

def predict(symbol, retro):
  model = keras.models.load_model(f'models/{symbol}.h5')
  data = getData(symbol, '1d', retro)
  data = calculateChange(data.drop(columns=['Closetime', 'Absolute Volume']))
  data = np.array(data).reshape((1,retro,data.shape[1]))
  return model.predict(data)[0][0]