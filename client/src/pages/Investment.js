import { useEffect, useState } from "react";
import InvestmentCard from "../components/InvestmentCard"
import CarouselComponent from "../components/Carousel";
import { useDispatch, useSelector } from "react-redux";
import Sort from "../components/Sort";
import Sort_Social from "../components/Sort_Social";
import Sort_Finance from "../components/Social_Finance";
import Searchbar from "../components/searchBar";
import { Button } from "react-bootstrap";
import { modify_sort } from "../reducers/filterSlice";


const Investment=()=>{
    const [data,setData]=useState([]);
    const [loaded,setLoaded]=useState(0);
    const sort=useSelector((state)=>state.filters.sort);
    const search=useSelector((state)=>state.filters.search);
    const dispatch=useDispatch()
    console.log(sort)
    useEffect(()=>{

        (async()=>{
        let url='/api/investments'
        if(sort!=''){
          url=url.concat('?sort='+sort)
          if(search!=''){
            url=url.concat('&search='+search);
          }
        }
        else if(search!=''){
          url=url.concat('?search='+search);
        }
      console.log(url)

        await fetch(url, {
            method:'GET',
             headers: {
               "Content-Type": "application/json",
             },
          
           }).then((resp) =>(resp.json()))
           .then((data) => {
             
            
            if(data) {setData(data);setLoaded(1)}
     
             
              else {
               if (data.errors) console.log(data.errors);
               
             }
           })
        })();
        return () => {
            // this now gets called when the component unmounts
          };
    },[sort,search]);

    const clearSearch=()=>{
      dispatch(modify_sort(''))

    }


    
    return(

      <div class='container-fluid'>

        <div class='row'>
        


        <div class='col-2'>

          <div class='row'>
          <Sort/>
          </div>

          <div class='row'>
          <Sort_Social/>
          </div>

          <div class='row'>
          <Sort_Finance/>
          </div>


        </div>

        <div class='col-10' style={{marginTop:10}}>
        <Searchbar/>
        <Button variant='danger' onClick={()=>{clearSearch()}} style={{marginTop:8}}>Clear</Button>
         {loaded==1?
            (
                <div class="row row-cols-4">
                {data.map((item) => {
                 
                    return (
                    <div class="col">
                    <InvestmentCard data={item}/>
                    </div>
                    );
            
            
                })}
              </div>
        )
        :<></>}
        </div>
        
      
       </div>
        </div>
    )



}

export default Investment