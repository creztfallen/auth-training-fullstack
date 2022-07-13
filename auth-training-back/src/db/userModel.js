const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: [true, 'The email address already exists.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    unique: false,
  },
});

const User = mongoose.model('users', UserSchema);
module.exports = mongoose.model.Users || mongoose.model('Users', UserSchema);
