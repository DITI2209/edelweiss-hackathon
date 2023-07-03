import './options.css';

const Table=({filteredData})=>{

return(
<table className="container shadow">
<thead>
  <tr>
    <th>
      <h1>Sr No.</h1>
    </th>
    <th>
      <h1>Type</h1>
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
      <td>{row['Type']}</td>
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
);
}
export default Table