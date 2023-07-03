import pandas as pd
import re
import math
from scipy.optimize import newton
from scipy.stats import norm
import numpy as np

def IV_list(df):
    
    if(len(df)>2000):
        return df.to_json(orient='records')
    def get_LTP(df):
        MAINIDX_index_LTP = df.iloc[0]['LTP']
        FINANCIALS_index_LTP = df.iloc[1]['LTP']
        ALLBANKS_index_LTP = df.iloc[2]['LTP']
        MIDCAPS_index_LTP = df.iloc[3]['LTP']

        return MAINIDX_index_LTP, FINANCIALS_index_LTP, ALLBANKS_index_LTP, MIDCAPS_index_LTP

    def black_scholes(S, K, T, r, sigma, option_type):
        K=float(K)
        d1 = (math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * math.sqrt(T))
        d2 = d1 - sigma * math.sqrt(T)

        if option_type == 'CE':
            price = S * norm.cdf(d1) - K * math.exp(-r * T) * norm.cdf(d2)
        elif option_type == 'PE':
            price = K * math.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
        else:
            raise ValueError('Invalid option type')

        return price

    def price_diff(sigma, market_price, S, K, T, r, option_type):
        model_price = black_scholes(S, K, T, r, sigma, option_type)
        diff = model_price - market_price
        return diff

    def implied_volatility(market_price, S, K, T, r, option_type):
        implied_vol = newton(price_diff, x0=0.5, args=(market_price, S, float(K), T, r, option_type))
        return implied_vol * 100

    implied_volatility_list = []
    for i in range(4, len(df)):
        option_price = df.iloc[i]['LTP']
        strike_price = df.iloc[i]['Strike Price']
        time_to_maturity = df.iloc[i]['TTM']
        risk_free_rate = 0.05

        x = df.iloc[i]["Trading Symbol"]
        result = re.match(r'^[A-Za-z]+', x)

        MAINIDX_index_LTP, FINANCIALS_index_LTP, ALLBANKS_index_LTP, MIDCAPS_index_LTP = get_LTP(df)

        underlying_price = 0
        if result.group() == "MAINIDX":
            underlying_price = MAINIDX_index_LTP
        elif result.group() == "FINANCIALS":
            underlying_price = FINANCIALS_index_LTP
        elif result.group() == "ALLBANKS":
            underlying_price = ALLBANKS_index_LTP
        elif result.group() == "MIDCAP":
            underlying_price = MIDCAPS_index_LTP

        option_type = df.iloc[i]["Type"]
        strike_price=float(strike_price)
        option_price=float(option_price)
        underlying_price=float(underlying_price)
        time_to_maturity=float(time_to_maturity)
        time_to_maturity=time_to_maturity/365

        ''' print(option_price)
        print(underlying_price)
        print(strike_price)
        print(time_to_maturity)
        print(risk_free_rate)
        print(option_type) '''

       
        if option_type != "XX":
            
                try:
                
                    iv = implied_volatility(option_price, underlying_price, strike_price, time_to_maturity, risk_free_rate,
                                        option_type)
               
                    implied_volatility_list.append(iv)

                except RuntimeError:
                    #print('error')
                    implied_volatility_list.append(0)

        else:
            implied_volatility_list.append(np.nan)

    implied_volatility_list = [np.nan, np.nan, np.nan, np.nan] + implied_volatility_list
    #print(implied_volatility_list)
    df["Implied Volatility"] = implied_volatility_list
    print(df)
    return df.to_json(orient='records')

