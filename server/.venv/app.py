from flask import Flask, render_template,jsonify
from flask_socketio import SocketIO,emit
from flask_cors import CORS
import struct
import socket
import datetime
import threading
from helpers import response_parser,dataframe,IV,change
import copy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'
CORS(app)
socketio = SocketIO(app,cors_allowed_origins='*')

old_data={}

@app.route('/')
def index():
    return 'hello world'

@app.route('/hi')
def hello():
    data = "hello world"
    return jsonify({'sign': data})


@socketio.on('connect')
def handle_connect():
    print('new connection')
    #print(old_data)
    emit('first_data',old_data)

@socketio.on('to-server')
def handle_to_server(arg):
    print(f'new to-server event: {arg}')
    emit('from-server', str(123))
  

def receive_data(host, port):
    global old_data

    data_dict = {
    "packet_length_list": [],
    "trading_symbol_list": [],
    "sequence_number_list": [],
    "timestamp_list": [],
    "ltp_list": [],
    "ltq_list": [],
    "volume_list": [],
    "bid_price_list": [],
    "bid_quantity_list": [],
    "ask_price_list": [],
    "ask_quantity_list": [],
    "open_interest_list": [],
    "previous_close_price_list": [],
    "prev_open_interest_list": []
    }

    last_time=0
    flag=False
    first_data={"packet_length_list": [],
                        "trading_symbol_list": [],
                        "sequence_number_list": [],
                        "timestamp_list": [],
                        "ltp_list": [],
                        "ltq_list": [],
                        "volume_list": [],
                        "bid_price_list": [],
                        "bid_quantity_list": [],
                        "ask_price_list": [],
                        "ask_quantity_list": [],
                        "open_interest_list": [],
                        "previous_close_price_list": [],
                        "prev_open_interest_list": []}
   

    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
       
        client_socket.connect((host, port))
        print(f"Connected to {host}:{port}")

        client_socket.sendto(bytes("a", encoding="utf-8"), (host, port))

       
        buffer = b"" 
        
        while True:
            
            data = client_socket.recv(1024)  

            if not data:
                break 

            buffer += data 

           
            while len(buffer) >= 130:  
                packet = buffer[:130] 
                buffer = buffer[130:]  

                data_dict,last_time,flag,first_data = response_parser.parse_response(response=packet,last_time=last_time,data_dict=data_dict,flag=flag) 
                
                if(flag):
                    print('in here')
                   
                    new_data=dataframe.convert_data(data_dict)
                    new_data=change.get_change_and_oi(new_data)
                    new_data=IV.IV_list(new_data)
                    old_data=copy.deepcopy(new_data)
                   
                    socketio.emit('data', new_data)
                    new_data=None
                   
                    
                    data_dict={
                        "packet_length_list": [first_data['packet_length']],
                        "trading_symbol_list": [first_data["trading_symbol"]],
                        "sequence_number_list": [first_data["sequence_number"]],
                        "timestamp_list": [first_data["timestamp"]],
                        "ltp_list": [first_data["ltp"]],
                        "ltq_list": [first_data["last_traded_quantity"]],
                        "volume_list": [first_data["volume"]],
                        "bid_price_list": [first_data["bid_price"]],
                        "bid_quantity_list": [first_data["bid_quantity"]],
                        "ask_price_list": [first_data["ask_price"]],
                        "ask_quantity_list": [first_data["ask_quantity"]],
                        "open_interest_list": [first_data["open_interest"]],
                        "previous_close_price_list": [first_data["prev_close_price"]],
                        "prev_open_interest_list": [first_data["prev_open_interest"]]
                    }
                    flag=False

                

    except ConnectionRefusedError:
        print("Connection refused. Make sure the Java JAR file is running and listening on the specified port.")
    except KeyboardInterrupt:
        print("Client stopped.")
    finally:
        client_socket.close()


if __name__ == '__main__':
    print('hi')
    host = 'localhost' 
    port = 4000

    threading.Thread(target=receive_data, args=(host, port)).start()

    socketio.run(app, port=5000)