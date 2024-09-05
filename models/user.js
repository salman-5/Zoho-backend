const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username: {type: String, required: true},
    pass: { type: String, required: true},
    secret: {type : String, required:true}
});

module.exports = mongoose.model('User',loginSchema);
