import express, { response, Router } from 'express';
import Product from '../Models/productModels.js';

const router = express.Router();

router.post('/add', (req, res) => {
  console.log(req.body);
  let form = req.body;
  Product
    .create({ ...form})
    .then((response) => {
      res.status(201).json({ message: 'success' });
    })
    .catch((err) => { 
      res.json(err);
    });
});

router.patch('/edit',(req,res)=>{
  console.log(req.body);
  Product.updateOne({_id:req.body._id},{...req.body})
  .then((response)=>{
    res.status(201).json({ message: 'success' });
  })
  .catch((err)=>{
    res.json(err)
  })
})

router.delete('/delete',(req,res)=>{
  console.log(req.query.id);
  Product.deleteOne({_id:req.query.id})
  .then((response)=>[
    res.status(200).json({message:"Succeess"})
  ])
  .catch((err)=>{
    res.json(err)
  })
})
 
export default router;
