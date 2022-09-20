import mongoose from 'mongoose';
const { Schema } = mongoose;

const User = new Schema({
  name:  String, // String is shorthand for {type: String}
  email: String,
  password:   String,
   
});

export default mongoose.model('User', User);
