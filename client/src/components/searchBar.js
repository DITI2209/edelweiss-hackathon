import { useState } from "react";
import { useDispatch } from "react-redux";
import { modify_search } from '../reducers/filterSlice';

 function Searchbar(){
    const [search,setSearch]=useState('');
    const dispatch=useDispatch()
    console.log('search is',search)
    
    function handleChange(e){
        setSearch(e.target.value);
       
    }

    function handleSubmit(){
        dispatch(modify_search(search))

    }
    return(
        <div>
            <div class="input-group rounded">
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" onChange={handleChange} />
            <button type="button" class="btn btn-outline-primary" onClick={handleSubmit}>Search</button>
            </div>
            
        </div>

    );

 }

export default Searchbar