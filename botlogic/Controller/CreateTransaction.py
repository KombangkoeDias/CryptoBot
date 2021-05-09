from Controller.DatabaseConnector import BotTransaction
from datetime import datetime

def CreateTransaction(symbol, amount, price, side):
    value = BotTransaction.find_one({'symbol': symbol})
    if side == 'buy':
        newTransaction = {'amount': amount, 'buy_price': price, 'transaction_time': datetime.now().strftime('%-d/%-m/%Y %-H:%M:%-S')}
    elif side == 'sell':
        newTransaction = {'amount': amount, 'sell_price': price, 'transaction_time': datetime.now().strftime('%-d/%-m/%Y %-H:%M:%-S')}
    else:
         raise ValueError('buy or sell only')
    if value is None:
        if side == 'buy':
            BotTransaction.insert_one({'symbol': symbol, 'transactions': {'buy': [newTransaction], 'sell': []}})
        else:
            BotTransaction.insert_one({'symbol': symbol, 'transactions': {'buy': [], 'sell': [newTransaction]}})
    else:
        transactions = value['transactions']
        transactions[side].append(newTransaction)
        BotTransaction.update_one({'symbol': symbol}, {"$set": {'transactions': transactions}})