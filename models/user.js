//Database
const mongoose  = require('mongoose');
//Hash dependency (encrypting password)
const bcrypt    = require('bcrypt');
//validates the form in put (i.e. email has an @)
const validator = require('validator');
//ref models
const Schema = mongoose.Schema;
//user model
const userSchema = new mongoose.Schema({
  firstName: { type: String, trim: true, required: true },
  lastName: { type: String, trim: true, required: true },
  email: { type: String, trim: true, required: true },
  passwordHash: { type: String, required: true },
  watching: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  basket: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  orders: {
    past: { type: Array },
    current: { type: Array }
  },
  privileges: {
    admin: { type: Boolean, default: false },
    stockView: { type: Boolean, default: false },
    addStock: { type: Boolean, default: false },
    userCRUD: { type: Boolean, default: false }
  }
});

//taking the password from the user input and hashing it
userSchema
  .virtual('password')
  .set(setPassword);

//taking the Password and the passwordConfirmation and confirming they match
userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

//validating the hash so that it is the same as the original password entered
userSchema
  .path('passwordHash')
  .validate(validatePasswordHash);

//checks the user has entered the correct user information
userSchema
  .path('email')
  .validate(validateEmail);

userSchema.methods.validatePassword = validatePassword;


//deleteing passwordHash and version
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

//exporting the model to other express files
module.exports = mongoose.model('User', userSchema);


//hashing the password
function setPassword(value) {
  this._password = value;
  this.passwordHash = bcrypt.hashSync(value, bcrypt.genSaltSync(8));
}


//confirming that they entered the password correctly
function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

//validate the hash and the requirements for the password
function validatePasswordHash() {
  if (this.isNew) {
    if (!this._password) {
      return this.invalidate('password', 'A password is required.');
    }
    if (this._password.length < 8) {
      return this.invalidate('password', 'Your password must be atleast 8 characters long.');
    }
    if (this._password !== this._passwordConfirmation) {
      return this.invalidate('passwordConfirmation', 'Passwords don\'t match');
    }
  }
}

//making sure that we have been given a valid email
function validateEmail(email) {
  if (!validator.isEmail(email)) {
    return this.invalidate('email', 'Email must be a valid email address.');
  }
}
//validatng the password with the hashedPassword stored in the database
function validatePassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
}
