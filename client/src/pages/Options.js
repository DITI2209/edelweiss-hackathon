import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './options.css';
import Table from './Table';
import CSVDownloadButton from './Download';
import TimerComponent from './Timer';

let socket;

const Options = () => {


  const [arrayOfCalls, setArrayOfCalls] = useState([]);
  const [arrayOfPuts, setArrayOfPuts] = useState([]);
  const [arrayOfFutures, setArrayOfFutures] = useState([]);
  const [currentArray,setCurrentArray]=useState([]);
  const [arrayOfIndexes,setArrayOfIndexes]=useState([]);
  const [currentIndex,setCurrentIndex]=useState([]);

  const [selectedSymbol, setSelectedSymbol] = useState("MAINIDX");
  const [selectedStrike, setSelectedStrike] = useState("");

  const [selected,setSelected]=useState(0);

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value);
    setSelectedStrike('')
  };

  const handleStrikeChange = (event) => {
    setSelectedStrike(event.target.value);
  };

  

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
      //console.log('puts',parsedData)
      setArrayOfPuts(parsedData);
      
    })

    socket.on('futures',(futures)=>{
      const parsedData = JSON.parse(futures);
      //console.log('futures',parsedData)
    
      setArrayOfFutures(parsedData);
      
    })

    socket.on('indexes',(indexes)=>{
      const parsedData = JSON.parse(indexes);
      parsedData[3]['Underlying']='MIDCAP';
      //console.log('indexes',parsedData)
    
      setArrayOfIndexes(parsedData);
      
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

  const filteredDataSymbol = selectedSymbol ? currentArray.filter((row) => row['Underlying'] === selectedSymbol) : currentArray;
  let filteredDataStrike=filteredDataSymbol
  if (selectedStrike!=''){
    filteredDataStrike = selectedStrike ? filteredDataSymbol.filter((row) => row['Strike Price'] === selectedStrike) : filteredDataSymbol;
  }
  const filteredIndex = selectedSymbol ? arrayOfIndexes.filter((row) => row['Underlying'] === selectedSymbol) : arrayOfIndexes;


  
  const DisplayText=(filteredIndex)=>{
    
    return(
      <div>
        <br>
        </br>
        <br></br>

        {filteredIndex[0]!=undefined?

        <p>
        Underlying Index: {filteredIndex[0]['Underlying']}  {filteredIndex[0]['LTP']}
        </p>
        :
        <p></p>
        }

      </div>
    )
  }
  return (
    <div>
     
      <div class="navi">
      <div class="tabs">
        <input type="radio" id="radio-1" name="tabs" />
        <label class="tab" for="radio-1" onClick={()=>setSelected(0)} >Calls</label>
        <input type="radio" id="radio-2" name="tabs" />
        <label class="tab" for="radio-2" onClick={()=>setSelected(1)}>Puts</label>
        <input type="radio" id="radio-3" name="tabs" />
        <label class="tab" for="radio-3" onClick={()=>setSelected(2)}>Futures</label>
        <span class="glider"></span>
      </div>
      </div>

      <div className="dropdown">
        {/* <label htmlFor="symbol">Select Symbol:</label> */}

        <select id="symbol" value={selectedSymbol} onChange={handleSymbolChange}>
          
          {Array.from(new Set(arrayOfCalls.map((row) => row['Underlying']))).map((symbol, index) => (
            <option key={index} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
        

      </div>

      <div className="dropdown">
        {/* <label htmlFor="symbol">Select Symbol:</label> */}

        <select id="symbol" value={selectedSymbol} onChange={handleSymbolChange}>
          
          {Array.from(new Set(arrayOfCalls.map((row) => row['Underlying']))).map((symbol, index) => (
            <option key={index} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>


      <div className="dropdown">
        

        <select id="symbol" value={selectedStrike} onChange={handleStrikeChange}>
          
          {Array.from(new Set(filteredDataSymbol.map((row) => row['Strike Price']))).map((symbol, index) => (
            <option key={index} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>

      </div>
      <br />
      <br/>



      {DisplayText(filteredIndex)}
      <CSVDownloadButton data={filteredDataStrike}/>

      {filteredDataSymbol[0]!=undefined?
      <TimerComponent timestamp={filteredDataSymbol[0]['Timestamp']} timer={4}/>
      :<></>
        }
      <Table filteredData={filteredDataStrike} filteredIndex={filteredIndex} selected={selected}/>
    
      
    </div>
  );
};

export default Options;
