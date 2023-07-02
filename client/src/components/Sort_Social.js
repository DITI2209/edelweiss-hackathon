import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify_sort } from "../reducers/filterSlice";

function Sort_Social(){
    //const get=useSelector((state) => state.sort.value);
    
    const [sort,setsort]=useState('');
    const dispatch=useDispatch();
   
    let new_sort2=[]
    
    //console.log('resselrs',sort);

    function handleChange(e){
        
        const { value, checked } = e.target;
       
        if (checked) {
            dispatch(modify_sort(value))
            //setsort([...sort,value]);
          }
        
          else {
            //console.log('not checked')
            //new_sort2=sort
            //let x=[]
            //x=new_sort2.filter((e)=>e!=value);
            //console.log('x not checkef is',x)
            dispatch(modify_sort(''))
            //setsort(x)
          }
        //console.log(sort)
       
    }

    function handleSubmit(){
       // dispatch(modify_final(sort));
    }
    return(
   
    
    <div class='main' style={{padding:5,marginTop:10}}>
        
        <div class='header' style={{fontWeight:'bold',fontSize:23}}>
         Social Impact
        </div>

        <div class="form-check"  >
        <input class="form-check-input" type="checkbox" value='asc_social' id="flexCheck11" onChange={handleChange}/>
        <label class="form-check-label text" for="flexCheck1" style={{fontSize:'1.2em'}}>
        Ascending
        </label>
        </div>

        <div class="form-check">
        <input class="form-check-input" type="checkbox" value='desc_social' id="flexCheckDefault1" onChange={handleChange}/>
        <label class="form-check-label text" for="flexCheckDefault" style={{fontSize:'1.2em'}}>
        Descending
        </label>
        </div>


        
       
    </div>
  )

}
export default Sort_Social