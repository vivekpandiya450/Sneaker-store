const mongoose=require("mongoose")

// product Schema

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true,
        enum:["newly","summer"]
    }
});

//model exports
module.exports=mongoose.model("Product",productSchema);
