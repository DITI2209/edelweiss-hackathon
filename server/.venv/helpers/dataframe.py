import struct
import socket
import datetime
import pandas as pd
import time

def convert_data(data_dict):
    print('in df '+str(len(data_dict['ltp_list'])))
    
    df = pd.DataFrame({
    "Packet Length": data_dict["packet_length_list"],
    "Trading Symbol": data_dict["trading_symbol_list"],
    "Sequence Number": data_dict["sequence_number_list"],
    "Timestamp": data_dict["timestamp_list"],
    "LTP": data_dict["ltp_list"],
    "LTQ": data_dict["ltq_list"],
    "Volume": data_dict["volume_list"],
    "Bid Price": data_dict["bid_price_list"],
    "Bid Quantity": data_dict["bid_quantity_list"],
    "Ask Price": data_dict["ask_price_list"],
    "Ask Quantity": data_dict["ask_quantity_list"],
    "Open Interest": data_dict["open_interest_list"],
    "Previous Close Price": data_dict["previous_close_price_list"],
    "Previous Open Interest": data_dict["prev_open_interest_list"]
})
    assert len(df["Packet Length"]) == len(df["Trading Symbol"])
    assert len(df["Packet Length"]) == len(df["Sequence Number"])
    assert len(df["Packet Length"]) == len(df["Timestamp"])
    assert len(df["Packet Length"]) == len(df["LTP"])
    assert len(df["Packet Length"]) == len(df["LTQ"])
    assert len(df["Packet Length"]) == len(df["Volume"])
    assert len(df["Packet Length"]) == len(df["Bid Price"])
    assert len(df["Packet Length"]) == len(df["Bid Quantity"])
    assert len(df["Packet Length"]) == len(df["Ask Price"])
    assert len(df["Packet Length"]) == len(df["Ask Quantity"])
    assert len(df["Packet Length"]) == len(df["Open Interest"])
    assert len(df["Packet Length"]) == len(df["Previous Close Price"])
    assert len(df["Packet Length"]) == len(df["Previous Open Interest"])

    df["Underlying"] = df["Trading Symbol"].str.extract(r"^(\D+)")
    df["Expiry Date"] = df["Trading Symbol"].str.extract(r"(\d{2}\w{3}\d{2})")
    df["Strike Price"] = df["Trading Symbol"].str.extract(r'(\d+)(?:CE|PE)$')
    df["Strike Price"] = df["Strike Price"].str[2:]
    df["Type"] = df["Trading Symbol"].str[-2:]

    def calculate_time_to_maturity(df):
        df["Expiry Date"] = pd.to_datetime(df['Expiry Date'], format='%d%b%y')
        current_datetime = datetime.datetime.now()
        df['Expiry Date Time'] = pd.to_datetime(df['Expiry Date'].dt.strftime('%Y-%m-%d') + ' 15:30')
        df["TTM"] = (df['Expiry Date Time'] - current_datetime).dt.total_seconds() / (60 * 60 * 24*365)

    calculate_time_to_maturity(df)

    #df = df.sort_index(axis=1)

    
    #df.to_csv("Data.csv", index=False)
    

   
    return df