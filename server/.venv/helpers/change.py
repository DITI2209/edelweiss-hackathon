import pandas as pd
import numpy as np



def get_change_and_oi(df):
    print(type(df['LTP'][0]),type(df['Previous Close Price'][0]),type(df['Open Interest'][0]),type(df['Previous Open Interest'][0]))

    df["Change"] = df["LTP"] - df["Previous Close Price"]

    df["Percentage Change"] = ((df["LTP"] - df["Previous Close Price"]) / df["Previous Close Price"]) * 100
    df["Percentage Change"].replace([np.inf], np.nan, inplace=True)

    df["Change in Open Interest"] = df["Open Interest"] - df["Previous Open Interest"]
    df["Percentage Change in Open Interest"] = ((df["Open Interest"] - df["Previous Open Interest"]) / df["Previous Open Interest"]) * 100
    df["Percentage Change in Open Interest"].replace([np.inf], np.nan, inplace=True) 

    #df.to_csv('Data.csv',index=False)
    return df

