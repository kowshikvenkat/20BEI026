import React from 'react'
import axios from 'axios'
import { Routes, Route, Link, Outlet } from 'react-router-dom';
function Home() {
const[Company,setCompany] = React.useState("")
const[Owner,setOwner] = React.useState("")
const[RollNo,setRollNo] = React.useState("")
const[Email,setEmail] = React.useState("")
const[Access,setAccess] = React.useState("")
const[showRegistered,setshowRegistered] = React.useState(false)
const[showRegistered1,setshowRegistered1] = React.useState(false)
const[ResponseData,setResponseData] = React.useState({})
const[ResponseMessage,setResponseMessage] = React.useState("")
const[ErrorMessage,setErrorMessage] = React.useState(false)
const[ResponseData1,setResponseData1] = React.useState({})
const[ResponseMessage1,setResponseMessage1] = React.useState("")
const[ErrorMessage1,setErrorMessage1] = React.useState(false)
const[clientID,setclientID] = React.useState("");
const[clientSecret,setclientSecret] = React.useState("")
function HandleAuth(e){
    e.preventDefault();
    axios.post("http://localhost:5000/train/auth",{
    company:Company,
    owner:Owner,
    rollno:RollNo,
    email:Email,
    clientID:clientID,
    clientSecret:clientSecret
}).then((response) => {

    if (response.status === 200) {
            setResponseData1(response.data.data); 
   // Access the response data
setResponseMessage1(response.data.message)
      setshowRegistered1(true);
    }
    else{
          setResponseMessage1(response.data.message);  
               setErrorMessage1(true);
    }
  })
}
function handleSubmit(e){
e.preventDefault()
axios.post("http://localhost:5000/train/register",{
    company:Company,
    owner:Owner,
    rollno:RollNo,
    email:Email,
    access:Access
}).then((response) => {

    if (response.status === 200) {
            setResponseData(response.data.data); 
   // Access the response data
setResponseMessage(response.data.message)
      setshowRegistered(true);
    }
    else{
          setResponseMessage(response.data.message);  
               setErrorMessage(true);
    }
  })
}
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h1>Register Your Train !</h1>
        <label htmlFor="">Company Name</label><input type="text" onChange={(e)=>setCompany(e.target.value)} />
        <label htmlFor="">Owner Name</label><input onChange={(e)=>setOwner(e.target.value)}  type="text"  />
        <label htmlFor="">RollNo </label><input onChange={(e)=>setRollNo(e.target.value)}  type="text"  />
           <label htmlFor="">Owner Email </label><input type="email" onChange={(e)=>setEmail(e.target.value)}   />
              <label htmlFor="">Access Code </label><input type="text" onChange={(e)=>setAccess(e.target.value)}  />
              <input type="submit" value="REGISTER" className='btn btn-success' />
      </form>
{ErrorMessage&& <b>{ResponseMessage}</b> }
      {showRegistered&&<div>
      <p>{ResponseMessage}!</p>
        <p>{ResponseData.company}</p>
        <p>Client ID: {ResponseData.clientID}</p>
        <p>Client Secret: {ResponseData.clientSecret}</p>
        <hr />
           
      </div>}
      <form action="" onSubmit={HandleAuth}>
        <h1>Authorize your Registeration !</h1>
        <label htmlFor="">Company Name</label><input type="text" onChange={(e)=>setCompany(e.target.value)} />
        <label htmlFor="">Owner Name</label><input onChange={(e)=>setOwner(e.target.value)}  type="text"  />
        <label htmlFor="">RollNo </label><input onChange={(e)=>setRollNo(e.target.value)}  type="text"  />
           <label htmlFor="">Owner Email </label><input type="email" onChange={(e)=>setEmail(e.target.value)}   />
       
               <label htmlFor="">Client ID </label><input type="text" onChange={(e)=>setclientID(e.target.value)}  />
                <label htmlFor="">Client Secret </label><input type="text" onChange={(e)=>setclientSecret(e.target.value)}  />
              <input type="submit" value="REGISTER" className='btn btn-success' />
      </form>
      {ErrorMessage1&& <b>{ResponseMessage1}</b> }
      {showRegistered1&&<div>
      <p>{ResponseMessage1}!</p>
        <p>{ResponseData1.company}</p>
          <p>Access Token: {ResponseData1.access_token}</p>
        <p>Expires In: {ResponseData1.expires_in}</p>    
        <hr />
           
      </div>}
    </div>
  )
}

export default Home
