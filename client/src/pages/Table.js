import './options.css';

const Table=({filteredData,filteredIndex,selected})=>{


    const inMoney=(row)=>{
        if (selected==0){
            if(parseFloat(row['Strike Price'])<parseFloat(filteredIndex[0]['LTP'])){
                return true
            }
            else{
                return false
            }

        }
        if(selected==1){
            if(parseFloat(row['Strike Price'])>parseFloat(filteredIndex[0]['LTP'])){
                return true
            }
            else{
                return false
            }


        }
        return false
    }


return(
<table className="container shadow">
<thead>
  <tr>
   
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
   
  </tr>
</thead>
<tbody>
  {filteredData.map((row, index) => (
    <>
    {inMoney(row)?
    <tr key={index} style={{backgroundColor:'rgb(68, 64, 64)'}}>
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
        <td>{new Date(row['Expiry Date']).toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'}).split('/').join('-')}</td>
    </tr>
    :
    <tr key={index}>
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
        <td>{new Date(row['Expiry Date']).toLocaleDateString('en-US', {day: '2-digit', month: '2-digit', year: 'numeric'}).split('/').join('-')}</td>
        
    </tr>
    
    }</>

  ))}
</tbody>
</table>
);
}
export default Table