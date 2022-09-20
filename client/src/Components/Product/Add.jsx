import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';
import { serverUrl } from '../../serverUrl';
import { useNavigate } from 'react-router-dom';

function Add() {
    const [form,setForm] =useState()
    const [image,setImage] = useState()
    const navigate= useNavigate()
    const formData = new FormData();
    let url
    const handleSubmit =async()=>{

      
            formData.append('file', image);
            formData.append('upload_preset', 'aadharCard_mySpace');
       
            let response=await axios.post('https://api.cloudinary.com/v1_1/dwzlm4vnj/image/upload', formData)
            url=(response.data.secure_url)
          
          console.log(url);
        //   setForm({...form,image:url})

          axios.post(`${serverUrl}/product/add`,{...form,image:url})
          .then((res)=>{
            navigate('/')
            //navigate
          })
          .catch((err)=>{
            console.log(err);

          })
    }

    const File =(e)=>{
        setImage(e[0])
    }
  return (
    <div>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
        }}
        noValidate
        autoComplete='off'
      >
        <h2>Add Product</h2>
        <TextField onChange={(e)=>{setForm({...form,name:e.target.value})}} id='outlined-basic' label='Name' variant='outlined' />
        <TextField onChange={(e)=>{setForm({...form,description:e.target.value})}} id='outlined-basic' label='Description' variant='outlined' />
        <TextField onChange={(e)=>{setForm({...form,amount:e.target.value})}} id='outlined-basic' label='Amount' variant='outlined' />
        <DropzoneArea onChange={File} />
        <Button onClick={handleSubmit} variant='contained'>
          Add
        </Button> 
      </Box>
    </div>
  );
}

export default Add;
