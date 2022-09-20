import express, { response } from 'express';
import User from '../Models/UserModel.js';
import bcrypt from 'bcrypt'


const router = express.Router();

router.get('/', (req, res) => {
  res.send('xkbkjnss');
});
router.post('/signup', (req, res) => {
  console.log(req.body);
  let form = req.body;
  bcrypt.hash(form.password, 10, function(err, hash) {
    // Store hash in your password DB.
    // console.log(hash);
    form.password=hash
    User.create({name:form.name, email:form.email, password:form.password})
     .then((response) => {
       res.status(201).json({ message: ' success' });
     })
     .catch((err) => {
         response.json(err)
     });
});
});


router.post('/login',async(req,res)=>{
    // console.log(req.body);
   let user =await User.findOne({email:req.body.email})
   console.log(user);
   if(user){
    const isUserValid = await bcrypt.compare(req.body.password, user.password);
    console.log(isUserValid);
    if(isUserValid){
        // res.cookie('login', true)
        res.status(200).json({message:"Success"})
    }else{
        res.status(404)
    }
   }else{
    res.status(404)
   }
})
export default router;
