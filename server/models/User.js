import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthdate: String,
  email: { type: String, unique: true },
  password: String, // hashed
  country: String,
  city: String,
  job: String,
  jobType: String,
  education: String,
  geminiResult: String
});

const User = mongoose.model('User', userSchema);

export default User;