const mongoose=require("mongoose")

const addressSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

const Address=mongoose.model("Address",addressSchema);
module.exports=Address;
