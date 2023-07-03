import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import './options.css';

let socket;

const Options = () => {
  const [dataList, setDataList] = useState([]);
  const [arrayOfObjects, setArrayOfObjects] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");

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

    socket.on('data', (data) => {
      const parsedData = JSON.parse(data);
      console.log(parsedData.length);
      console.log([parsedData[0], parsedData[1], parsedData[2], parsedData[3]]);
      setArrayOfObjects(parsedData);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const filteredData = selectedSymbol ? arrayOfObjects.filter((row) => row['Trading Symbol'] === selectedSymbol) : arrayOfObjects;

  const sendToServer = () => {
    socket.emit('to-server', 'hello');
  };

  return (
    <div>
      <div className="dropdown">
        <label htmlFor="symbol">Select Symbol:</label>
        <select id="symbol" value={selectedSymbol} onChange={handleSymbolChange}>
          <option value="">All</option>
          {Array.from(new Set(arrayOfObjects.map((row) => row['Underlying']))).map((symbol, index) => (
            <option key={index} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>
      <br />
      <br />
      <table className="container shadow">
        <thead>
          <tr>
            <th>
              <h1>Sr No.</h1>
            </th>
            <th>
              <h1>Packet Length</h1>
            </th>
            <th>
              <h1>Trading Symbol</h1>
            </th>
            <th>
              <h1>Sequence number</h1>
            </th>
            <th>
              <h1>Strike Price</h1>
            </th>
            <th>
              <h1>Expiry</h1>
            </th>
            <th>
              <h1>Time Stamp</h1>
            </th>
            <th>
              <h1>LTP</h1>
            </th>
            <th>
              <h1>LTQ</h1>
            </th>
            <th>
              <h1>Volume</h1>
            </th>
            <th>
              <h1>Bid Price</h1>
            </th>
            <th>
              <h1>Bid Quantity</h1>
            </th>
            <th>
              <h1>Ask Price</h1>
            </th>
            <th>
              <h1>Ask Quantity</h1>
            </th>
            <th>
              <h1>Open Interest</h1>
            </th>
            <th>
              <h1>Prev Close Price</h1>
            </th>
            <th>
              <h1>Prev Open Interest</h1>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row['Packet Length']}</td>
              <td>{row['Underlying']}</td>
              <td>{row['Sequence Number']}</td>
              <td>{row['Strike Price']}</td>
              <td>{row['Expiry']}</td>
              <td>{row['Timestamp']}</td>
              <td>{row['LTP']}</td>
              <td>{row['LTQ']}</td>
              <td>{row['Volume']}</td>
              <td>{row['Bid Price']}</td>
              <td>{row['Bid Quantity']}</td>
              <td>{row['Ask Price']}</td>
              <td>{row['Ask Quantity']}</td>
              <td>{row['Open Interest']}</td>
              <td>{row['Previous Close Price']}</td>
              <td>{row['Previous Open Interest']}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={sendToServer}>Send</button>
    </div>
  );
};

export default Options;
