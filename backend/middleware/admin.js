const jwt = require('jsonwebtoken');
const adminid = "5fca2527b7d16927ec0a69f9"
const admin = (req, res, next)=>{
    try{
    const token = req.header("x-auth-token");
    if(!token){
        return res.status(401).json({msg:"Not authenticated"})
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if(!verified){
        return res.status(401).json({msg:"token verification failed, Auth Denied"})
    }
    if(verified.id!=adminid){
        return res.status(401).json({msg:"Authorisation denied"})
    }
    req.user = verified.id;
    next();
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}
module.exports = admin;