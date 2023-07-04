import pandas as pd
import numpy as np
def get_change_and_oi(df):
    df["Change"] = df["LTP"] - df["Previous Close Price"]
    df["Percentage Change"] = ((df["LTP"] - df["Previous Close Price"]) / df["Previous Close Price"]) * 100
    df["Percentage Change"].replace([np.inf], np.nan, inplace=True)
    df["Change in Open Interest"] = df["Open Interest"] - df["Previous Open Interest"]
    df["Percentage Change in Open Interest"] = ((df["Open Interest"] - df["Previous Open Interest"]) / df["Previous Open Interest"]) * 100
    df["Percentage Change in Open Interest"].replace([np.inf], np.nan, inplace=True) 
    return df

