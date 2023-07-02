import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify_sort } from "../reducers/filterSlice";

function Sort_Finance(){
    //const get=useSelector((state) => state.sort.value);
    
    const [sort,setsort]=useState('');
    const dispatch=useDispatch();
   
    let new_sort2=[]
    
    //console.log('resselrs',sort);

    function handleChange(e){
        
        const { value, checked } = e.target;
       
        if (checked) {
            dispatch(modify_sort(value))
           
          }
        
          else {
            dispatch(modify_sort(''))
          }
       
    }

    function handleSubmit(){
       // dispatch(modify_final(sort));
    }
    return(
   
    
    <div class='main' style={{padding:5,marginTop:10}}>
        
        <div class='header' style={{fontWeight:'bold',fontSize:23}}>
         Financial Risk
        </div>

        <div class="form-check"  >
        <input class="form-check-input" type="checkbox" value='asc_finance' id="flexCheck1" onChange={handleChange}/>
        <label class="form-check-label text" for="flexCheck1" style={{fontSize:'1.2em'}}>
        Ascending
        </label>
        </div>

        <div class="form-check">
        <input class="form-check-input" type="checkbox" value='desc_finance' id="flexCheckDefault" onChange={handleChange}/>
        <label class="form-check-label text" for="flexCheckDefault" style={{fontSize:'1.2em'}}>
        Descending
        </label>
        </div>


        
       
    </div>
  )

}
export default Sort_Finance