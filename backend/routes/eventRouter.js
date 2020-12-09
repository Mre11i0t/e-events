const router = require("express").Router();
const Data = require("../models/eventModel");
const User = require("../models/userModel");
const admin = require("../middleware/admin")
const auth = require('../middleware/auth')
router.post('/addEvent',admin, async(req, res) => {
        let data = new Data();
        const { eventname, description, start, end, url, imagelink } = req.body;
        if(!eventname||!description||!start||!end){
            return res.status(400).json({msg:"Required fields have to be entered"})
        }
        const existingEvent = await User.findOne({ eventname: eventname })
        if (existingEvent) {
            return res.status(400).json({ msg: "Event already Exists please modify it" })
        }
        data.eventname = eventname;
        data.description = description;
        data.start = start;
        data.end = end;
        data.url = url;
        data.imagelink=imagelink;
        
        let event = { eventname: eventname, description: description, start: start, end: end,url: url,imagelink: imagelink};
        data.save(err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, event: event })
    });
});

router.get("/getEvents", async(req, res) => {
    Data.find((err, events) => {
        let eventData = {}
        let eventList = []
        events.forEach(elem => {
            let temp = {}
            temp.eventname = elem.eventname;
            temp.description = elem.description;
            temp.start = elem.start;
            temp.end = elem.end;
            temp.url=elem.url;
            temp.imagelink=elem.imagelink;
            eventList.push(temp);
        });
        eventData.events = eventList;
        if (err) return res.json({ success: false, error: err });
        return res.json({eventData});
    });
});

router.delete("/deleteEvent",admin, async(req, res) => {
        const { eventname } = req.body;
        match = { eventname: eventname }
        Data.deleteOne(match, err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, eventname: eventname });
        });
});
router.get("/id",auth,async(req,res)=>{
    const user = await User.findById(req.user);
    res.json({
        name: user.name,
        id: user._id
    });
})
module.exports = router;