import { useEffect } from "react";
import { Card } from "react-bootstrap";
import {BsBuildings} from 'react-icons/bs';
import { useNavigate } from "react-router-dom";

import "./investmentCard.css";

const InvestmentCard=({data})=>{
    const navigation=useNavigate()
    const safety={
        0: "Risky",
        1: "Risky",
        2: "Risky",
        3: "Risky",
        4: "Moderate",
        5: "Moderate",
        6: "Safe",
        7: "Safe",
        8: "Safe",
        9: "Very Safe",
        10: "Very Safe"
        }

    const navigateTo=()=>{
        navigation('/investmentdetail',{
            state:data
                
        })
    }
    return(
       
    <Card style={{marginLeft:10,marginTop:10,flex:1}}>
    
    <div class="card-header">
        <a onClick={()=>{navigateTo()}}><h3 class="card-title">{data.name}</h3></a>
    </div>
    <div style={{padding:5}}>
        <div class='row'>
        <div class='col row'><div class='col'><BsBuildings/></div><div class='col'><p class="card-text">{data.companySize}</p></div></div>
        <div class='col'><p class="card-text">{data.industry}</p></div>
        <div class='col'><p class="card-text">{safety[data.financialPerformance]}</p></div>
        </div>

        <p class="card-text">{data.description}</p>
        <p class="card-text">Environmental Impact Score: {data.environmentalImpactScore}</p>
        <p class="card-text">Social Impact Score: {data.socialImpactScore}</p>
        
    </div>
    
    </Card>
   
    );

}

export default InvestmentCard