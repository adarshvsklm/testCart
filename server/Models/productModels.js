import mongoose from 'mongoose';
const { Schema } = mongoose;

const Product = new Schema({
  name:  String, // String is shorthand for {type: String}
  description: String,
  amount: Number,
  image:   String,
   
});

export default mongoose.model('Product', Product);
