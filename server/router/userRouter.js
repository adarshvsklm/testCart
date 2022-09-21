import express, { response } from 'express';
import User from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import Product from '../Models/productModels.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('xkbkjnss');
});
router.post('/signup', (req, res) => {
  console.log(req.body);
  let form = req.body;
  bcrypt.hash(form.password, 10, function (err, hash) {
    // Store hash in your password DB.
    // console.log(hash);
    form.password = hash;
    User.create({ name: form.name, email: form.email, password: form.password })
      .then((response) => {
        res.status(201).json({ message: ' success' });
      })
      .catch((err) => {
        response.json(err);
      });
  });
});

router.post('/login', async (req, res) => {
  // console.log(req.body);
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (user) {
    const isUserValid = await bcrypt.compare(req.body.password, user.password);
    console.log(isUserValid);
    if (isUserValid) {
      res.cookie('id', user._id);
      res.status(200).json({ message: 'Success' });
    } else {
      res.status(404);
    }
  } else {
    res.status(404);
  }
});

router.get('/products', (req, res) => {
  Product.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.patch('/addToCart', async (req, res) => {
  // console.log(req.cookies);
  let isProduct = await User.findOne({
    _id: req.cookies.id,
    'cart._id': req.body._id,
  });
  if (!isProduct) {
    User.updateOne({ _id: req.cookies.id }, { $push: { cart: req.body } })
      .then((response) => {
        console.log(response);
        res.status(200);
      })
      .catch((err) => {
        // console.log(err);
        response.json(err);
      });
  } else {
    res.status(200);
  }
});

router.get('/cart', async (req, res) => {
  console.log('dfgsdf');
  if (req.cookies.id) {
    let user = await User.findOne({ _id: req.cookies.id });
    res.status(200).json(user.cart);
  } else {
    res.status(404);
  }
});

router.patch('/cart/delete', (req, res) => {
  console.log(req.body);
  User.updateOne({ _id: req.cookies.id }, {$pull :{cart:{_id:req.body._id}}})
  .then((response)=>{
    console.log(response);
    res.status(200).json(response)
  })
  .catch((err)=>{
    res.json(err)
    console.log(err);
  })
});

export default router;
