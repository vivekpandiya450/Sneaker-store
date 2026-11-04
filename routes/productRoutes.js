const express=require("express")
const router=express.Router();

const Product=require("../models/Product")

// Get allProducts
router.get("/",async(req,res)=>{
    try{
        const products=await Product.find();

        res.status(200).json({
            message:"Product featched successfully!",
            products:products
        })
    }catch(error){
        res.status(500).json({
            message:"Error Featching products",
            error:error.message
        })
    }
})

// POST ADD new Product
router.post("/",async(req,res)=>{
    try{
        console.log("Received Data:",req.body);

        const newProduct=new Product(req.body);
        const savedProduct=await newProduct.save();

        res.status(201).json({
            message:"Product added successfully!",
            product:savedProduct
        })
    }catch(error){
        res.status(500).json({
            message:"Error adding product",
            error:error.message
        })
    }
})

// Get Single Product
router.get("/:id",async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })
        }
        res.status(200).json({
            message:"Product featched succssfully!",
            product:product
        })
    }catch(error){
        res.status(500).json({
            message:"Error featching product",
            error:error.message
        });
    }
})

// PUT update  Prduct
router.put("/:id",async(req,res)=>{
    try{
        const updateProduct=await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        );
        if(!updateProduct){
            return res.status(404).json({
                message:"Product not found"
            });
        }
        res.status(200).json({
            message:"Product updated successfully!",
            product:updateProduct
        });

    }catch(error){
        res.status(500).json({
            message:"Error updating product",
            error:error.message
        })
    }
})

// Delete  delete the Product

router.delete("/:id", async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            message: "Product deleted successfully!",
            product: deletedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            error: error.message
        });
    }
});

// Get Summer Collection Products
router.get("/section/summer",async(req,res)=>{
    try{
        const products=await Product.find({
            section:"summer"
        })
        res.status(200).json({
            message:"Summer Products Featched Successfully!",
            products:products
        });
    }catch(error){
        res.status(500).json({
            message:"Error Featching Summer Products",
            error:error.message
        })
    }
})
// get all product
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            message: "Products fetched successfully!",
            products: products
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message
        });
    }
});

// GET newly Dropped Products
router.get("/section/newly",async(req,res)=>{
    try{
        const products=await Product.find({
            section:"newly"
        });
        res.status(200).json({
            message:"Newly Dropped products Featched Successfully!",
            products:products
        });

    }catch(error){
        res.status(500).json({
            message:"Error featching Newly Products",
            error:error.message
        })
    }
})
module.exports=router;
