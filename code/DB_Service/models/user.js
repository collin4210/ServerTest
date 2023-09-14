//Bauplan für einen User

var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
 username: String,
 password: String,
 name: String,
 nachname: String,
 PLZ: Number,
 Adresse: String,
 Stadt: String,
 Email: String,
 
 updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('User', UserSchema);