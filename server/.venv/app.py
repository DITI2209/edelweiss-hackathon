from flask import Flask, render_template,jsonify
from flask_socketio import SocketIO,emit
from flask_cors import CORS
import struct
import socket
import datetime
import threading

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'
CORS(app)
socketio = SocketIO(app,cors_allowed_origins='*')

@app.route('/')
def index():
    return 'hello world'

@app.route('/hi')
def hello():
    data = "hello world"
    return jsonify({'sign': data})

@socketio.on("chat")
def handle_chat():
    print("client has connected")
    emit("connect",{"data":f"id: is connected"})


@socketio.on('connect')
def handle_connect():
    print('new connection')

@socketio.on('to-server')
def handle_to_server(arg):
    print(f'new to-server event: {arg}')
    emit('from-server', str(123))
  

def receive_data(host, port):
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
        # Connect to the server socket
        client_socket.connect((host, port))
        print(f"Connected to {host}:{port}")

        client_socket.sendto(bytes("a", encoding="utf-8"), (host, port))

        # Receive the response from the server
        buffer = b""  # Initialize an empty buffer to accumulate data
        while True:
            data = client_socket.recv(1024)  # Receive data from the socket

            if not data:
                break  # No more data, break the loop

            buffer += data  # Accumulate the received data

            # Process complete packets in the buffer
            while len(buffer) >= 130:  # Check if enough data for a complete packet
                packet = buffer[:130]  # Extract a complete packet
                buffer = buffer[130:]  # Remove the processed packet from the buffer

                parsed_data = parse_response(packet)  # Parse and process the packet

                # Emit the parsed data to all connected clients
                socketio.emit('data', parsed_data)

    except ConnectionRefusedError:
        print("Connection refused. Make sure the Java JAR file is running and listening on the specified port.")
    except KeyboardInterrupt:
        print("Client stopped.")
    finally:
        # Close the client socket
        client_socket.close()

def parse_response(response):
    if len(response) < 130:  # Check if the response is complete
        print("Incomplete packet received")
        return
    
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
    timestamp = datetime.datetime.fromtimestamp(timestamp / 1000).strftime('%a %b %d %H:%M:%S %Z %Y')

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

    return data

if __name__ == '__main__':
    print('hi')
    host = 'localhost'  # Use 'localhost' or '127.0.0.1' to connect to the local machine
    port = 4000  # Use the same port as the Java JAR file

    # Start the data receiving thread
    threading.Thread(target=receive_data, args=(host, port)).start()

    # Start the Flask-SocketIO app
    socketio.run(app, port=5000)