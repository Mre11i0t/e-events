const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require("../middleware/auth")
router.post("/register",async(req, res)=>{
    try{
    const {email, password, passwordCheck, name}=req.body;
    if(!email||!password||!passwordCheck||!name){
        return res.status(400).json({msg:"Not all fields have been entered"})
    }
    if(password.length<8){
        return res.status(400).json({msg:"password needs to be atleast 8 characters long"})
    }
    if(password!=passwordCheck){
        return res.status(400).json({msg:"passwords dont match"})
    }
    const existingUser = await User.findOne({email : email})
    if(existingUser)
        return res.status(400).json({msg:"User already Exists"})
    const salt = await bcrypt.genSalt();
    const passwordhash = await bcrypt.hash(password, salt);

    const newUser = new User({
        name, 
        password:passwordhash,
        email,
    })
    const savedUser = await newUser.save();
    res.json(savedUser); 
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
});

router.post('/login',async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email||!password){
            return res.status(400).json({msg:"Enter all fields"})
        }
        const user = await User.findOne({email:email})
        if(!user){
             return res.status(400).json({msg:"User not Found"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:"Invalid Credentials"})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        res.json({
            token,
            user: {
                id:user._id,
                name: user.name,
            }
        })
    }
    catch(err){
        res.status(500).json({error:err.message})
    } 

})
router.delete("/delete",auth, async(req,res)=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
});
router.post("/tokenisvalid",async(req, res)=>{
    try{
        const token = req.header("x-auth-token");
        if(!token) return res.json(false);
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id)
        if(!user)return res.json(false);
        return res.json(true)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
router.get("/",auth, async(req,res)=>{
    const user = await User.findById(req.user);
    res.json({
        name: user.name,
        id: user._id
    });
})
module.exports = router;