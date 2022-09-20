import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios'
import { serverUrl } from '../serverUrl';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [form, setForm] = useState({});
  const navigate  = useNavigate()

  let isName = /^[a-zA-Z ]+$/.test(form.name);
  let isEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      form.email
    );
    

  const handleSubmit = () => {
    axios.post(`${serverUrl}/signup`,{...form})
    .then((res)=>{
        console.log(res);
        //navigate
        navigate('/login')
    })
    .catch((err)=>{
        console.log(err);
    })
  };

  return (
    <div>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
        noValidate
        autoComplete='off'
      >
        <h3>SignUp</h3>
        <TextField
          id='outlined-basic'
          label='Name'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
        <TextField
          id='outlined-basic'
          label='Email'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />
        <TextField
          id='outlined-basic'
          label='Password'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />
        <TextField
          id='outlined-basic'
          label='Confirm Password'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, cPassord: e.target.value });
          }}
        />
        <Button 
        disabled={
            !isEmail ||
            !isName 
            // !form.name ||
            // !form.email ||
             
            // !(form.password==form.cPassord)
        }
        onClick={handleSubmit} variant='contained'>
          SignUp
        </Button> 
      </Box>
    </div>
  );
}

export default SignUp;
