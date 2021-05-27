from selenium import webdriver
import os
os.environ['MOZ_HEADLESS'] = '1'

def PancakeFunc():
    driver = webdriver.Chrome()
    chromeOptions = webdriver.ChromeOptions()
    chromeOptions.add_extension()
    driver.get("https://coinmarketcap.com")
    return {"test": "done"}

