import subprocess
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app, async_mode='threading', cors_allowed_origins='*')

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def on_connect():
    emit('output', {'output': 'Connected to Java process.'})
    run_java_command()

def run_java_command():
    command = 'java -Ddebug=true -classpath feed-play-1.0.jar hackathon.player.Main dataset.csv 8080'
    process = subprocess.Popen(command.split(), stdout=subprocess.PIPE, stderr=subprocess.STDOUT, universal_newlines=True)

    while True:
        output = process.stdout.readline()
        if output == '' and process.poll() is not None:
            break
        if output:
            socketio.emit('output', {'output': output.strip()}, namespace='/')
            print(type(output))

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)
