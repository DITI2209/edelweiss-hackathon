import './options.css';

const Table=({filteredData})=>{

return(
  <table className="container shadow">
  <thead>
    {/* <tr>
      <th colSpan="12">Calls</th>
      <th colSpan="12">Puts</th>
    </tr> */}
    <tr>
      {/* <th><h1>Sr No.</h1></th> */}
      <th><h1>OI</h1></th>
      <th><h1>CHNG IN OI</h1></th>
      <th><h1>Volume</h1></th>
      <th><h1>IV</h1></th>
      <th><h1>LTP</h1></th>
      <th><h1>CHNG</h1></th>
      <th><h1>BID QTY</h1></th>
      <th><h1>BID</h1></th>
      <th><h1>Ask</h1></th>
      <th><h1>Ask QTY</h1></th>
      <th><h1>Strike</h1></th>
      <th><h1>Expiry Date</h1></th>
{/*       
      <th><h1>BID QTY</h1></th>
      <th><h1>BID</h1></th>
      <th><h1>Ask</h1></th>
      <th><h1>Ask QTY</h1></th>
      <th><h1>CHNG</h1></th>
      <th><h1>LTP</h1></th>
      <th><h1>IV</h1></th>
      <th><h1>Volume</h1></th>
      <th><h1>CHNG IN OI</h1></th>
      <th><h1>OI</h1></th>
      <th></th> */}
    </tr>
  </thead>
  <tbody>
    {filteredData.map((row, index) => (
      <tr key={index}>
        {/* <td>{index + 1}</td> */}
        <td>{row['Open Interest']}</td>
        <td>{row['Change in Open Interest']}</td>
        <td>{row['Volume']}</td>
        <td>{row['Implied Volatility']}</td>
        <td>{row['LTP']}</td>
        <td>{row['Change']}</td>
        <td>{row['Bid Quantity']}</td>
        <td>{row['Bid Price']}</td>
        <td>{row['Ask Price']}</td>
        <td>{row['Ask Quantity']}</td>
        <td>{row['Strike Price']}</td>
        <td>{row['Expiry Date Time']}</td>
      </tr>
    ))}
  </tbody>
</table>
);
}
export default Table