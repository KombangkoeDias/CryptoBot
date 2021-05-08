def EverydayPriceFunc(EverydayPrice):
    res = dict()
    x = EverydayPrice.find()
    for val in x:
        res[val['symbol']] = val['price']
    return res