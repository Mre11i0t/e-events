const router = require("express").Router();
const Data = require("../models/eventModel");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
// const url= require('url')
router.post('/attendEvent',auth, async(req, res) => {
    try{
        const token = req.header("x-auth-token");
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        let queryEvent = req.query;
        let event=await Data.findOne(queryEvent);
        console.log(event);
        let user = await User.findById(verified.id);
        console.log(user)
        let checker = false;
        for(i in user.events){
            if(user.events[i].eventname===event.eventname) checker = true;
        }
        if(checker)
        {
            return res.status(400).json({error:"event already added"});
        }

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
