import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import RangeSlider from '../components/RangeSlider';
import { useDispatch, useSelector } from 'react-redux';
function Profile() {
    const user=useSelector((state)=>state.auth.user);
    const [name,setName]=useState('');

    const dispatch=useDispatch();


    const [value, setValue] = useState(5);

    const handleChange = (event) => {
        setValue(event.target.value);
    
    };

    const [value2, setValue2] = useState(5);

    const handleChange2 = (event) => {
        setValue2(event.target.value);
    
    };

    useEffect(()=>{
        if(user)
        setName(user.name)
    },[user]);

    const handleSubmit=async()=>{

        await fetch('/api/auth/update', {
            method:'POST',
             headers: {
               "Content-Type": "application/json",
             },
            body:JSON.stringify({email:user.email,riskTolerance:0,environmentalScore:parseInt(value),socialScore:parseInt(value2)})
           }).then((resp) =>(resp.json()))
           .then((data) => {
                 
                  localStorage.setItem("environment", value);
                  localStorage.setItem("social",value2);

             
            if (data.ok) {
               
              console.log(data)
             }
              else {
               if (data.errors) console.log(data.errors);
               
             }
           })

    }


    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '50%' }}>
               
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        Enter your preferences for searching for investments
                    </Card.Text>
                    <Card.Text>
                        Select the following from a range of 0 to 10: 0 is least impactful and 10 is most impactful
                    </Card.Text>
                   
                    Environmental Impact
                    <div>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={value}
                            onChange={handleChange}
                        />
                        <p>Selected value: {value}</p>
                    </div>

                    Societal Impact
                    <div>
                        <input
                            type="range"
                            min="0"
                            max="10"
                            value={value2}
                            onChange={handleChange2}
                        />
                        <p>Selected value: {value2}</p>
                    </div>

                    <Button onClick={()=>{handleSubmit()}}>Save</Button>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Profile