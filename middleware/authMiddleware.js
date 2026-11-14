const jsonwebtoken=require("jsonwebtoken")
const User=require("../models/User.js")

const authMiddleware=async(req,res,next)=>{

    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message:"Access denied.No token provided"
        })
    }
    const token=authHeader.split(" ")[1];

    try{
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

          if (!user){
        return res.status(401).json({
            message:"User not found.Please login again."
        })
    }
    req.user=user
next()
    }

  
    catch(error){
        return res.status(401).json({
           message:"Invalid or exprired token"
        });
    }
}

module.exports=authMiddleware;

