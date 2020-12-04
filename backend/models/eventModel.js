const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
    eventname: { type: String, required: true,unique:true},
    description: { type: String, required: true },
    start:{type:String,required:true},
    end: { type: String, required: true },
    url:{type:String,required:false},
    imagelink:{type:String,required:false},
    attendees:[] //array of strings
});

module.exports = Data = mongoose.model("Data", eventSchema);
