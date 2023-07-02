import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

let socket;

const Options=()=>{
    const [dataList,setDataList]=useState([]);
    console.log(dataList)
    let data_list=[]
    

    useEffect(()=> {
        socket = io('http://127.0.0.1:5000');

        

        socket.on("connect", (data) => {
            console.log('Connected to socket'); // true
           
          });
        
        /*   socket.on('old_data',(old_data)=>{
            console.log(old_data);
          })  */


        socket.on('from-server', (msg) => {
            console.log(msg);
          });

        socket.on('data',(data)=>{


            
            
            const arrayOfObjects = JSON.parse(data);
            console.log(arrayOfObjects.length)
            console.log([arrayOfObjects[0],arrayOfObjects[1],arrayOfObjects[2],arrayOfObjects[3]])
        
            
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