const mongoose = require('../libs/mongoose');
const pick = require('lodash/pick');

const publicFields = ['email', 'name', 'lastname', 'login'];

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'E-mail must be specified',
    validate: [
      {
        validator(value) {
          return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
        },
        message: 'Incorrect email format'
      }
    ],
    unique: 'Such email is already exists'
  },
  name: {
    type: String,
    required: 'User name should be specified',
  },
  lastname: {
    type: String,
    required: 'User last name should be specified',
  },
  login: {
    type: String,
    required: 'Loing should be specified',
    unique: 'Such login is already in use'
  }

}, {
  timestamps: true,
});

userSchema.methods.serialize = function serializeUser() {
  let user = pick(this, [...publicFields]);
  user.id = this._id;
  return user;
}

userSchema.statics.publicFields = publicFields;

module.exports = mongoose.model('User', userSchema);
