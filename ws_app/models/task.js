var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// kreiramo novu shemu
var taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
  },
  creator:{
    type:String,
    required:true
    },
  project:{
  type:String,
  required:true
  },
  deadline: Date,
  createdAt: Date,
  updatedAt: Date
});


// prilikom snimanja se postavi datum
taskSchema.pre('save', function(next) {
  // preuzmemo trenutni datum
  var currentDate = new Date();
  // postavimo trenutni datum poslednju izmenu
  this.updatedAt = currentDate;

  // ako nije postavljena vrednost za createdAt, postavimo je
  if (!this.createdAt)
    this.createdAt = currentDate;

  // predjemo na sledecu funckiju u lancu
  next();
});



// od sheme kreiramo model koji cemo koristiti
var Task = mongoose.model('Task', taskSchema);

// publikujemo kreirani model
module.exports = Task;
