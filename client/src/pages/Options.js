import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './options.css';
import Table from './Table';

let socket;

const Options = () => {

  const [dataList, setDataList] = useState([]);

  const [arrayOfCalls, setArrayOfCalls] = useState([]);
  const [arrayOfPuts, setArrayOfPuts] = useState([]);
  const [arrayOfFutures, setArrayOfFutures] = useState([]);
  const [currentArray,setCurrentArray]=useState([]);

  const [selectedSymbol, setSelectedSymbol] = useState("MAINIDX");

  const [selected,setSelected]=useState(0);

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value);
  };

  console.log(dataList);

  useEffect(() => {
    socket = io('http://127.0.0.1:5000');

    socket.on("connect", () => {
      console.log('Connected to socket');
    });

    socket.on('from-server', (msg) => {
      console.log(msg);
    });


    socket.on('first_data',(first_data)=>{
      console.log(first_data)
      const parsedData = JSON.parse(first_data);
      //console.log(parsedData.length);
      //console.log([parsedData[0], parsedData[1500], parsedData[20], parsedData[30]]);
      //setArrayOfCalls(parsedData);
      
    })

    socket.on('calls', (data) => {
      const parsedData = JSON.parse(data);
      console.log('calls',parsedData)
    
      setArrayOfCalls(parsedData);
    });

    socket.on('puts',(puts)=>{
      const parsedData = JSON.parse(puts);
      console.log('puts',parsedData)
      setArrayOfPuts(parsedData);
      
    })

    socket.on('futures',(futures)=>{
      const parsedData = JSON.parse(futures);
      console.log('futures',parsedData)
    
      setArrayOfFutures(parsedData);
      
    })

    return () => {
      socket.disconnect();
    };
  }, []);


  useEffect(()=>{
    if(selected==0){
      setCurrentArray(arrayOfCalls)
    };
    if(selected==1){
      setCurrentArray(arrayOfPuts)
    }
    if(selected==2){
      setCurrentArray(arrayOfFutures);
    }

  },[selected,arrayOfCalls,arrayOfPuts,arrayOfFutures]);

  const filteredData = selectedSymbol ? currentArray.filter((row) => row['Underlying'] === selectedSymbol) : currentArray;

  

  const sendToServer = () => {
    socket.emit('to-server', 'hello');
  };

  return (
    <div>
     
      <button onClick={()=>setSelected(0)}>Calls</button>
      <button onClick={()=>setSelected(1)}>Puts</button>
      <button onClick={()=>setSelected(2)}>Futures</button>

      <div className="dropdown">
        <label htmlFor="symbol">Select Symbol:</label>
        <select id="symbol" value={selectedSymbol} onChange={handleSymbolChange}>
          
          {Array.from(new Set(arrayOfCalls.map((row) => row['Underlying']))).map((symbol, index) => (
            <option key={index} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>
      <br />
      <br />
      <Table filteredData={filteredData}/>
    
      <button onClick={sendToServer}>Send</button>
    </div>
  );
};

export default Options;
