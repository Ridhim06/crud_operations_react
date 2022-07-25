import React, { useEffect, useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Create() {
    let navigate =useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail,setValidEmail]=useState('')
    const [age, setAge] = useState('');
    const [occupation, setOccupation] = useState('');
    const [apiData, setApiData] = useState([]);

    const [address, setAddress] = useState('');
console.log(name);
console.log(email);
console.log(age);
console.log(occupation);
console.log(address);

useEffect(()=>{
    axios.get('https://62dbe8744438813a260d107c.mockapi.io/Crud')
    .then((getData) => {
        setApiData(getData.data);
    })
},[])

const checkUniqueEmail=()=>{
    console.log("apiData",apiData)
   let filteredData= apiData && apiData.length>0 && apiData.filter(el=>el.email==email)
   if(filteredData.length>0){
    setValidEmail("email id already present")
       return false
   }
   return true
}
const emailValidation=()=>{
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(email==''||regex.test(email)===false){
        setValidEmail("email in wrong format")
        return false
    }
    return true
}
const sendDataToAPI = () =>{
    let emailstate= emailValidation()
    let uniqueEmail=false
if(emailstate){
    uniqueEmail=checkUniqueEmail()
}
    if(uniqueEmail){
    axios.post('https://62dbe8744438813a260d107c.mockapi.io/Crud',{
    name,
    email,
    age,
    occupation,
    address     
    }).then(()=>{
        navigate('/read')
    })
    // window.location.reload()
}
}

    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Name</label>
                    <input name='name' onChange={(e)=>setName(e.target.value)} placeholder='Name' />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input name='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Email' />
                </Form.Field>
                <label style={{color:"red"}}>{validEmail}</label>
                <Form.Field>
                    <label>Age</label>
                    <input name='age' onChange={(e)=>setAge(e.target.value)} placeholder='Age' />
                </Form.Field>
                
                <Form.Field>
                    <label>Occupation</label>
                    <input name='occupation' onChange={(e)=>setOccupation(e.target.value)} placeholder='Occupation' />
                </Form.Field>
                <Form.Field>
                    <label>Addess</label>
                    <input name='address' onChange={(e)=>setAddress(e.target.value)} placeholder='Addess' />
                </Form.Field>

                <Button type='submit' onClick={sendDataToAPI}>Submit</Button>
            </Form>
        </div>
    )
}
