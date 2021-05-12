from flask import request
from Controller.DatabaseConnector import BotPort, BotTransaction, BotProfit


def CoinTradeDataFunc():
    request.get_data()
    symbol = request.form.get('symbol')
    Port = BotPort.find_one({'symbol': symbol})
    if Port is None:
        res_port = {'symbol': symbol, 'amount': 0, 'average_buy': 0}
    else:
        res_port = Port
    Transactions = BotTransaction.find_one({'symbol': symbol})
    if Transactions is None:
        res_transactions = {'symbol': symbol, 'transactions': {'buy': [], 'sell': []}}
    else:
        res_transactions = Transactions
    Profit = BotProfit.find_one({'symbol': symbol})
    if Profit is None:
        res_profit = {'symbol': symbol, 'profit': 0}
    else:
        res_profit = Profit
    for key in ['_id']:
        del res_port[key]
        del res_transactions[key]
        del res_profit[key]
    return {'symbol': symbol, 'port': res_port, 'transactions': res_transactions, 'profit': res_profit}