const router = require("express").Router();
const User = require("../models/usereventModel");
const Data = require("../models/eventModel");
const User = require("../models/userModel");
const auth = require("../middleware/auth");
router.post('/attendEvent',auth, async(req, res) => {
    
});