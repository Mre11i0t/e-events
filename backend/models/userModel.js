const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {type: String, required: true, unique:true},
    password: {type: String, required: true, minlength:8},
    email: {type: String, required:true, unique:true},
});

module.exports = User = mongoose.model("user",userSchema);