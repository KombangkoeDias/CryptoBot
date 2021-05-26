from selenium import webdriver
import os
os.environ['MOZ_HEADLESS'] = '1'

def getLogo(abbr):
    try:
        driver = webdriver.Firefox()
        driver.get("https://coinmarketcap.com")
        inputs = driver.find_elements_by_css_selector('div.q0coyt-1')
        for el in inputs:
            if (el.get_attribute('innerHTML') == 'Search'):
                el.click()
                break
        inputs = driver.find_elements_by_tag_name('input')
        coinpanels = []
        for el in inputs:
            if el.get_attribute('placeholder') == 'What are you looking for?':
                el.send_keys(abbr)
                coinpanels = driver.find_elements_by_css_selector('a > div > div')
                break
        res = ""
        for coin in coinpanels:
            # print(coin.get_attribute('class'))
            ps = coin.find_elements_by_tag_name('p')
            for p in ps:
                # print(p.get_attribute('innerHTML'))
                if p.get_attribute('innerHTML') == abbr.upper():
                    img = coin.find_element_by_tag_name('img')
                    print(img.get_attribute('src'))
                    res = img.get_attribute('src')
                    driver.close()
                    return res
    except:
        return ""
