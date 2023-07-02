import struct
import datetime
def parse_response(response,last_time,data_dict,flag):

    
    if len(response) < 130:  # Check if the response is complete
        print("Incomplete packet received")
        return
    
    data={}
    
    packet_length = struct.unpack('i', response[:4])[0]
    trading_symbol = response[4:34].decode('utf-8', errors='replace').rstrip('\x00')
    sequence_number = struct.unpack('q', response[34:42])[0]
    timestamp = struct.unpack('q', response[42:50])[0]
    ltp = struct.unpack('q', response[50:58])[0]
    last_traded_quantity = struct.unpack('q', response[58:66])[0]
    volume = struct.unpack('q', response[66:74])[0]
    bid_price = struct.unpack('q', response[74:82])[0] 
    bid_quantity = struct.unpack('q', response[82:90])[0]
    ask_price = struct.unpack('q', response[90:98])[0] 
    ask_quantity = struct.unpack('q', response[98:106])[0]
    open_interest = struct.unpack('q', response[106:114])[0]
    prev_close_price = struct.unpack('q', response[114:122])[0] 

    # Check if the response has sufficient length for prev_open_interest
    if len(response) >= 130:
        prev_open_interest = struct.unpack('q', response[122:130])[0]
    else:
        prev_open_interest = -1

    temp=datetime.datetime.fromtimestamp(timestamp/1000)
    timestamp = datetime.datetime.fromtimestamp(timestamp / 1000).strftime('%a %b %d %H:%M:%S %Z %Y')
      
    
    if(last_time==0):
        last_time=temp

        #append to list
        data_dict["packet_length_list"].append(packet_length)
        data_dict["trading_symbol_list"].append(trading_symbol)
        data_dict["sequence_number_list"].append(sequence_number)
        data_dict["timestamp_list"].append(timestamp)
        data_dict["ltp_list"].append(ltp)
        data_dict["ltq_list"].append(last_traded_quantity)
        data_dict["volume_list"].append(volume)
        data_dict["bid_price_list"].append(bid_price)
        data_dict["bid_quantity_list"].append(bid_quantity)
        data_dict["ask_price_list"].append(ask_price)
        data_dict["ask_quantity_list"].append(ask_quantity)
        data_dict["open_interest_list"].append(open_interest)
        data_dict["previous_close_price_list"].append(prev_close_price)
        data_dict["prev_open_interest_list"].append(prev_open_interest)
        
    else:

        time_diff = last_time - temp
       
        if((time_diff.total_seconds()>6 or time_diff.total_seconds()<-6) and trading_symbol=='MAINIDX'):
            print('break')
            flag=True
            last_time=0
            data = {
                "packet_length": packet_length,
                "trading_symbol": trading_symbol,
                "sequence_number": sequence_number,
                "timestamp": timestamp,
                "ltp": ltp,
                "last_traded_quantity": last_traded_quantity,
                "volume": volume,
                "bid_price": bid_price,
                "bid_quantity": bid_quantity,
                "ask_price": ask_price,
                "ask_quantity": ask_quantity,
                "open_interest": open_interest,
                "prev_close_price": prev_close_price,
                "prev_open_interest": prev_open_interest
            }
           
        else:
             #append to list
            data_dict["packet_length_list"].append(packet_length)
            data_dict["trading_symbol_list"].append(trading_symbol)
            data_dict["sequence_number_list"].append(sequence_number)
            data_dict["timestamp_list"].append(timestamp)
            data_dict["ltp_list"].append(ltp)
            data_dict["ltq_list"].append(last_traded_quantity)
            data_dict["volume_list"].append(volume)
            data_dict["bid_price_list"].append(bid_price)
            data_dict["bid_quantity_list"].append(bid_quantity)
            data_dict["ask_price_list"].append(ask_price)
            data_dict["ask_quantity_list"].append(ask_quantity)
            data_dict["open_interest_list"].append(open_interest)
            data_dict["previous_close_price_list"].append(prev_close_price)
            data_dict["prev_open_interest_list"].append(prev_open_interest)


  

    return data_dict,last_time,flag,data