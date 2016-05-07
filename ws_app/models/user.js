var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* https://www.npmjs.com/package/bcryptjs */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

// kreiramo novu shemu
var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: String,
  createdAt: Date
});


// prilikom snimanja se postavi datum
userSchema.pre('save', function(next) {
  // preuzmemo trenutni datum
  var currentDate = new Date();
  this.createdAt = currentDate;

  //transform password
  var hash = bcrypt.hashSync(this.password, salt);
  this.password=hash;

  // predjemo na sledecu funckiju u lancu
  next();
});


userSchema.methods.createProject = function (projectName) {
   //TODO
};



// od sheme kreiramo model koji cemo koristiti
var User = mongoose.model('User', userSchema);

// publikujemo kreirani model
module.exports = User;
