import { useEffect, useState } from "react";
import { Card } from "react-bootstrap"
import LineChart from "./LineChart";
import './PortfolioComponent.css';


const PortfolioComponent=({data})=>{
    const [investments,setInvestments]=useState([]);
    console.log(investments)
    const dates = [];
    const prices = [];
    const name_company=data.investmentName

    for (const obj of investments) {
    dates.push(obj.investmentDate.toString().substring(0,9));
    prices.push(obj.investmentPrice);
    }

    let total=(data.investmentAmount)-(data.quantity*(prices.slice(-1).pop()));
    total=Math.round(total)
    let selling=''
    if(total>0){
        selling='Profit : '+total
    }
    else{
        selling='Loss : '+total
    }

    
    const [loaded,setLoaded]=useState(0);
    useEffect(()=>{

        (async()=>{
        
        let url='/api/investments?search='+name_company
         console.log(url)

        await fetch(url, {
            method:'GET',
             headers: {
               "Content-Type": "application/json",
             },
          
           }).then((resp) =>(resp.json()))
           .then((data) => {

             
            
            if(data) {setInvestments(data[0].investmentPrice);setLoaded(1)}
     
             
              else {
               if (data.errors) console.log(data.errors);
               
             }
           })
        })();
        return () => {
            // this now gets called when the component unmounts
          };
    },[]);

   
    return(
        <div>
             <Card style={{marginLeft:10,marginTop:10,flex:1}}>
    
            <div class="card-header">
                <h3 class="card-title">{data.investmentName}</h3>
            </div>
            <div style={{padding:5}}>
                
                <p class="card-text">Amount : {data.investmentAmount}</p>
                <p class="card-text">Quantity : {data.quantity}</p>
                <p class='card-text'>{selling}</p>
                
                
            </div>
            
           <LineChart time={dates} prices={prices}/> 
            
            </Card>
        </div>
    )



}
export default PortfolioComponent