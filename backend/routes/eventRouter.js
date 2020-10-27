const router = require("express").Router();
const Data = require("../models/eventModel");
const User = require("../models/userModel");
const adminid = "5f97e6abe8fe291184112400"

router.post('/addEvent', async(req, res) => {
    // const token = req.header("x-auth-token");
    // if (!token) return res.status(403).json({ msg: "Not A Admin" })
    // const verified = jwt.verify(token, process.env.JWT_SECRET);
    // if (verified.id == adminid){
        let data = new Data();
        const { eventname, description, date, time, url, imagelink } = req.body;
        if(!eventname||!description||!date||!time){
            return res.status(400).json({msg:"Required fields have to be entered"})
        }
        const existingEvent = await User.findOne({ eventname: eventname })
        if (existingEvent) {
            return res.status(400).json({ msg: "Event already Exists please modify it" })
        }
        data.eventname = eventname;
        data.description = description;
        data.date = date;
        data.time = time;
        data.url = url;
        data.imagelink=imagelink;
        
        let event = { eventname: eventname, description: description, date: date, time: time,url: url,imagelink: imagelink};
        data.save(err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, event: event })
    });
    // }
    // else return res.status(403).json({ msg: "Not A Admin" })
});

router.get("/getEvents", async(req, res) => {
    Data.find((err, events) => {
        let eventData = {}
        let eventList = []
        events.forEach(elem => {
            let temp = {}
            temp.eventname = elem.eventname;
            temp.description = elem.description;
            temp.date = elem.date;
            temp.time = elem.time;
            temp.url=elem.url;
            temp.imagelink=elem.imagelink;
            eventList.push(temp);
        });
        eventData.events = eventList;
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, events: eventData });
    });
});

router.delete("/deleteEvent", async(req, res) => {
    // const token = req.header("x-auth-token");
    // if (!token) return res.status(403).json({ msg: "Not A Admin" })
    // const verified = jwt.verify(token, process.env.JWT_SECRET);
    // if (verified.id == adminid) {
        const { eventname } = req.body;
        match = { eventname: eventname }
        //console.log(match);
        Data.deleteOne(match, err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, eventname: eventname });
        });
    // } else return res.status(403).json({ msg: "Not A Admin" })
});

// Update
router.post("/editEvent", async(req, res) => {
    // const token = req.header("x-auth-token");
    // if (!token) return res.status(403).json({ msg: "Not A Admin" })
    // const verified = jwt.verify(token, process.env.JWT_SECRET);
    // if (verified.id == adminid) {
        const { eventname, description, date, time, url,imagelink } = req.body;
        match = { eventname: eventname };
        console.log(description);
        console.log(date);
        console.log(time);
        console.log(url);
        console.log(imagelink);
        update = { eventname:eventname, description: description, date: date, time: time, url: url,imagelink: imagelink };
        Data.updateOne(match, update, err => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
        });
    // } else return res.status(403).json({ msg: "Not A Admin" })
});

router.get("/findEvent", async(req,res) => {
    const { eventname } = req.body;
    match = { eventname: eventname }
    Data.find((err,events) => {
        let temp = {}
        events.forEach(elem => {
            if (elem.eventname == match.eventname){
                temp.eventname = elem.eventname;
                temp.description = elem.description;
                temp.date = elem.date;
                temp.time = elem.time;
                temp.url = elem.url;
                temp.imagelink = elem.imagelink;
            }
        });
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, event: temp });
    });
});
module.exports = router;


