var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true},
  tagname: { type: String, unique: true, required: true},
  phone_number: { type: Number, unique: true, required: true},  
  created_art: [ { type: Schema.Types.ObjectId, ref: 'Art'} ],
  found_art: [ { type: Schema.Types.ObjectId, ref: 'Art'} ],
})

var User = mongoose.model('User', userSchema);  

module.exports = User;