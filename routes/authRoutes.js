const express=require("express");
const bcrypt=require("bcryptjs");
const User=require("../models/User");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware")

const jwt=require("jsonwebtoken")


// Singup API
router.post("/signup",async(req,res)=>{

    try{
        const {fullname,email,mobile,password,confirmPassword}=req.body;

        if(!fullname||!email||!mobile||!password||!confirmPassword){
           res.status(400).json({
            message:"Please fill all the Fields"
           })
           return
        }
        if(password!==confirmPassword){
            res.status(400).json({
                message:"Password and confirm Password do not match"
            })
            return
        }
       const emailExists=await User.findOne({email:email});
        if(emailExists){
        res.status(400).json({
        message:"Email already registered"
    })
    return
}
     const mobilenumber=await User.findOne({mobile:mobile});
     if(mobilenumber){
        res.status(400).json({
            message:"Mobile number already registered"
        })
        return
     }
     const saltRounds=10;
     const hashedPassword=await bcrypt.hash(password,saltRounds)
     
     const newUser=new User({
        fullname:fullname,
        email:email,
        mobile:mobile,
        password:hashedPassword
     })

     await newUser.save()
     
     res.status(201).json({
            message:"User registered successfully"
        });


    }catch(error){
        res.status(500).json({
            message:"Server error"
            
        })
    }
})


// Login API
router.post("/login",async(req,res)=>{

    try{
        const {email,password}=req.body;

        if(!email||!password){
            res.status(400).json({
                message:"Please fill all the fields"
            })
            return
        }

        const user=await User.findOne({email:email})
         if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            })
         }

         const isPasswordCorrect=await bcrypt.compare(password,user.password);
         if(!isPasswordCorrect){
            return res.status(401).json({
                message:"Invalid email or password"
            })
         }

         const token=jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
         );
         res.status(200).json({
            message:"Login successful",
            token:token
         })

    }catch(error){
        res.status(500).json({
            message:"Server error"
        })
    }
})

//profile route

router.get("/profile", authMiddleware, async (req, res) => {

    try {
        res.status(200).json({
            message: "Profile fetched successfully",
            user: {
                fullname: req.user.fullname,
                email: req.user.email,
                mobile: req.user.mobile
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }

});
module.exports=router