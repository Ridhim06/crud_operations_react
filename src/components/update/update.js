import React, { useState,useEffect } from 'react';
import { Form, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Update() {
    let navigate=useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail,setValidEmail]=useState('')
    const [age, setAge] = useState('');
    const [occupation, setOccupation] = useState('');
    const [address, setAddress] = useState('');
    const [ID,setId]=useState(null);
    const [apiData, setApiData] = useState([]);
console.log(name);
console.log(email);
console.log(age);
console.log(occupation);
console.log(address);
console.log(apiData)

const sendDataToAPI = () =>{
    
    if(validEmail=='')
    {
    axios.put(`https://62dbe8744438813a260d107c.mockapi.io/Crud/${ID}`,{
    name,
    email,
    age,
    occupation,
    address     
    }).then(()=>{
        setValidEmail('')
        navigate('/read')
    })
    }
    
}
useEffect(()=>{
setName(localStorage.getItem('name'));
setEmail(localStorage.getItem('email'));
setAge(localStorage.getItem('age'));
setOccupation(localStorage.getItem('occupation'));
setAddress(localStorage.getItem('address'));
setId(localStorage.getItem('ID'))
},[])

useEffect(()=>{
    axios.get('https://62dbe8744438813a260d107c.mockapi.io/Crud')
    .then((getData) => {
        setApiData(getData.data);
    })
},[])

const checkUniqueEmail=(emailid)=>{
    console.log("apiData",apiData)
   let filteredData= apiData && apiData.length>0 && apiData.filter(el=>el.email==emailid)
   if(filteredData.length>0){
    setValidEmail("email id already present")
       return false
   }
   else{
       setValidEmail('')
   }
   
   return true
}
const emailValidation=(emailid)=>{
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(emailid==''||regex.test(emailid)===false){
        setValidEmail("email in wrong format")
        return false
    }
    else{
        setValidEmail('')

    }
    return true
}


const checkvalidemail=(email)=>{
    let emailstate= emailValidation(email)
    let uniqueEmail=false
    if(emailstate){
        uniqueEmail=checkUniqueEmail(email)
    }
}
    return (
        <div>
            <Form>
                <Form.Field>
                    <label>Name</label>
                    <input name='name' 
                    value={name}
                    onChange={(e)=>setName(e.target.value)} 
                    placeholder='Name'                    
                    />
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input name='email' 
                    onChange={(e)=>{checkvalidemail(e.target.value);setEmail(e.target.value)}} 
                    placeholder='Email' 
                    value={email}/>
                </Form.Field>
                <label style={{color:"red"}}>{validEmail}</label>
                <Form.Field>
                    <label>Age</label>
                    <input name='age' 
                    onChange={(e)=>setAge(e.target.value)} 
                    placeholder='Age' 
                    value={age}/>
                </Form.Field>
                <Form.Field>
                    <label>Occupation</label>
                    <input name='occupation' 
                    onChange={(e)=>setOccupation(e.target.value)} 
                    placeholder='Occupation' 
                    value={occupation}/>
                </Form.Field>
                <Form.Field>
                    <label>Addess</label>
                    <input name='address' 
                    onChange={(e)=>setAddress(e.target.value)} 
                    placeholder='Addess' 
                    value={address}/>
                </Form.Field>

                <Button type='submit' onClick={sendDataToAPI}>Update</Button>
            </Form>
        </div>
    )
}
