var mongoose = require('mongoose');
var ToolSchema = new mongoose.Schema({
 bezeichnung: String,
 ausgeliehen: Boolean,
 OwnerUsername: String,


 updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Tool', ToolSchema);