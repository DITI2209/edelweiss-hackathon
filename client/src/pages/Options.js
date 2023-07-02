import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;

const Options=()=>{
    

    useEffect(()=> {
        socket = io('http://127.0.0.1:5000');

        socket.on("connect", () => {
            console.log(socket.connected); // true
          });

        socket.on("chat", (chat) => {
           
            console.log(chat)
        });

        socket.on('from-server', (msg) => {
            console.log(msg);
          });

        socket.on('data',(data)=>{
            console.log(data);
        });
        
          
      
        return (() => {
            socket.disconnect()
        })
    }, []);

    const sendToServer = () => {
        socket.emit('to-server', 'hello');
      }

    return(
        <div>
                hi hbucns 
                <button onClick={sendToServer}>Send</button>
        </div>
    );
};
export default Options