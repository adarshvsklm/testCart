import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
 import { useState } from 'react';
import { useEffect } from 'react';
import { serverUrl } from '../serverUrl';

 
export default function Cart() {
    const [cartChange,setCartChange]=useState(true)
  const [products, setProducts] = useState([]);

  const fetchData = () => {
    axios
      .get(`${serverUrl}/cart`,{withCredentials:true})
      .then((res) => {
        setProducts(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  useEffect(()=>{
      fetchData();
  },[cartChange])

  const deleteFromCart =(product)=>{
    axios.patch(`${serverUrl}/cart/delete`,product,{withCredentials:true})
    .then((res)=>{
        console.log(938749387);
        setCartChange(!cartChange)
        console.log(res);
    })
    .catch((err)=>{
        console.log(err);
    })
  }

  return (
    <>
      <div style={{display:'flex'}}>
      {products &&
        products.map((item) => {
          return (
            <Card sx={{ maxWidth: 250 , margin:'10px' }}>
              <CardHeader
                action={
                  <IconButton aria-label='settings'>
                    <MoreVertIcon />
                  </IconButton>
                }
                title= {item.name}
                subheader={ `Amount : ${item.amount}`}
              />
              <CardMedia
                component='img'
                height='194'
                image={item.image}
                alt='Paella dish'
              />
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label='add to favorites'>
                    <CloseIcon onClick={(e)=>{deleteFromCart(item)}} />
                 </IconButton>
                <IconButton aria-label='share'>
                 </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </>
  );
}
