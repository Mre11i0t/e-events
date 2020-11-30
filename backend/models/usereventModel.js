const mongoose = require('mongoose')
const usereventSchema=new mongoose.Schema({
    email: {type: String, required:true, unique:true},
    listofevents: {type: Array,required:false}
});
module.exports = Data = mongoose.model("Userevent", usereventSchema);