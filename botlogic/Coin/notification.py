import requests

class PercentageReached:
    def __init__(self,sturdy):
        if not sturdy:
            self.values =  {
                "up": {
                    1: False,
                    2: False,
                    3: False,
                    5: False,
                    7: False,
                    10: False,
                    20: False,
                    30: False,
                    40: False,
                    50: False,
                    70: False,
                    80: False,
                    100: False,
                    150: False,
                    200: False
                },
                "down": {
                    1: False,
                    2: False,
                    3: False,
                    5: False,
                    7: False,
                    10: False,
                    20: False,
                    30: False,
                    40: False,
                    50: False,
                    70: False
                }
            }
        else:
            self.values =  {
                "up": {
                    7: False,
                    10: False,
                    20: False,
                    30: False,
                    40: False,
                    50: False,
                    70: False,
                    80: False,
                    100: False,
                    150: False,
                    200: False
                },
                "down": {
                    7: False,
                    10: False,
                    20: False,
                    30: False,
                    40: False,
                    50: False,
                    70: False
                }
            }
        self.upPercentageMax = 0
        self.downPercentageMax = 0

    def getPercentageRange(self):
        return (-self.downPercentageMax, self.upPercentageMax)

    def setPercentage(self,side,percentage,boolean):
        self.values[side][percentage] = boolean
        if side == 'up' and percentage > self.upPercentageMax:
            self.upPercentageMax = percentage
        elif side == 'down' and percentage > self.downPercentageMax:
            self.downPercentageMax = percentage

    def clearPercentage(self,side):
        for key in self.values[side].keys():
            self.values[side][key] = False
        
