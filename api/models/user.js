const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true}, //// Defines the 'username' field as a string. username is not a string, Mongoose will throw error
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isValidPassword = async function(password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", UserSchema);

module.exports = User;
