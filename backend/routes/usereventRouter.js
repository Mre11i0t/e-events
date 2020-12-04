const router = require("express").Router();
const Data = require("../models/eventModel");
const auth = require("../middleware/auth");
const url = require('url');

router.post('/attendEvent',auth, async(req, res) => {
    url = url.parse(req.url);
    match = url.query;
    temp = { attendees:attendees.push(req.user) };
    Data.upstartOne(match, temp, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
        });
    });
    // Data.attendees.push(req.user);
module.exports = router;