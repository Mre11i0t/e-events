const router = require("express").Router();
const Data = require("../models/eventModel");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const url= require('url')
router.post('/attendEvent',auth, async(req, res) => {
    try{
        const token = req.header("x-auth-token");
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        let myurl = url.parse(req.url);
        let event=await Data.findOne({eventname:myurl.query});
        console.log(event)
        await User.findByIdAndUpdate(
            verified.id,
            { $push: {events:event}}
        )
        return res.status(200).json({success:true})
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
    // Data.attendees.push(req.user);
});
router.get('/getUserevents',auth,async(req, res) =>{
    try{
        const token = req.header("x-auth-token");
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        let userevents=await User.findById(
            verified.id,
        )
        return res.status(200).json({events:userevents.events})
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
})
module.exports = router;
