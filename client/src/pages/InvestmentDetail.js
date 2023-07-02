import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";


const InvestmentDetail=()=>{
    const location=useLocation()
    const data=location.state;
    const user=useSelector((state)=>state.auth.user);
    

    const handleAdd=async()=>{
       
      const inv=data.investmentPrice.slice(-1).pop().investmentPrice
        await fetch('/api/portfolio', {
            method:'POST',
             headers: {
               "Content-Type": "application/json",
             },
            body:JSON.stringify({user_email:user.email,investmentName:data.name,investmentAmount:inv,investmentDate:'2022',quantity:1})
           }).then((resp) =>(resp.json()))
           .then((data) => {
             
            if (data.ok) {
               
              console.log(data)
             }
              else {
               if (data.errors) console.log(data.errors);
               
             }
           })
    }
    return(
       
    <div class="card">
    <div class="card-header">
        <h3 class="card-title">{data.name}</h3>
    </div>
    <div class="card-body">
        <p class="card-text">Description: {data.description}</p>
        <p class="card-text">Company Size: {data.companySize}</p>
        <p class="card-text">Industry: {data.industry}</p>
        <p class="card-text">Environmental Impact: {data.environmentalImpact}</p>
        <p class="card-text">Environmental Impact Score: {data.environmentalImpactScore}</p>
        <p class="card-text">Social Impact: {data.socialImpact}</p>
        <p class="card-text">Social Impact Score: {data.socialImpactScore}</p>
        <p class="card-text">Financial Performance: {data.financialPerformance}</p>
       

        <Button onClick={()=>{handleAdd()}}>Add to portfolio</Button>
        
    </div>
    </div>

);


}
export default InvestmentDetail