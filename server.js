require("dotenv").config();
const mongoose=require("mongoose");
const Product=require("./models/Product")
const express=require("express");
const app=express();
const productRoutes=require("./routes/productRoutes")
const authRoutes=require("./routes/authRoutes")

const addressRoutes=require("./routes/addressRoutes.js");

const cors=require("cors")
app.use(cors({origin:"http://127.0.0.1:5500"}))
app.use(express.json())

const PORT=3000;

//frountend ki static files serve karna
app.use(express.static("public"));


app.use("/api/products",productRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/addresses",addressRoutes)

mongoose.connect(process.env.MONGO_URI)
     .then(()=>{
        console.log("MongoDB connected Successfully!");
     })
     .catch((error)=>{
        console.log("MongoDB Connection Error:",error.message);
        
     })


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})