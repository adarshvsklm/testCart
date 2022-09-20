import React, { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import { serverUrl } from '../serverUrl';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form,setForm] = useState()
    const [error,setError] = useState()
    const navigate =useNavigate()
    const handleSubmit =()=>{
        axios.post(`${serverUrl}/login`,{...form} )
        .then((res)=>{
            navigate('/')
            //navigate
        })
        .catch((err)=>{
            setError("UserName Or Password is incorrect")
            console.log(err);
        })
    }
  return (
    <div>
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}
      noValidate
      autoComplete="off"
    >
        <h2>Login</h2>
        {error && <label style={{color:'red'}}> {error}</label>}
      <TextField onChange={(e)=>{setForm({...form,email:e.target.value})}} id="outlined-basic" label="email" variant="outlined" />
      <TextField onChange={(e)=>{setForm({...form,password:e.target.value})}} id="outlined-basic" label="password" variant="outlined" />
    <Button onClick={handleSubmit} variant='contained'>
          Login
        </Button> 
    </Box>
    </div>
  )
}

export default Login
