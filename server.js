require("dotenv").config();
const mongoose=require("mongoose");
const Product=require("./models/Product")
const express=require("express");
const app=express();
const productRoutes=require("./routes/productRoutes")

app.use(express.json())

const PORT=3000;

//frountend ki static files serve karna
app.use(express.static("public"));


app.use("/api/products",productRoutes)
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