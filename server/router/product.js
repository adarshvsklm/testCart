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

 
export default router;
