const express=require("express");
const Address=require("../models/Address.js");
const authMiddleware=require("../middleware/authMiddleware.js");

const router=express.Router();


router.post("/", authMiddleware, async (req, res) => {

    try {

        const { fullname, mobile, pincode, city, state } = req.body;

        const address = new Address({
            fullname,
            mobile,
            pincode,
            city,
            state,
            user: req.user._id
        });

        await address.save();

        res.status(201).json({
            message: "Address added successfully",
            address
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

});

router.get("/", authMiddleware, async (req, res) => {

    try {

        const addresses = await Address.find({
            user: req.user._id
        });

        res.status(200).json({
            message: "Addresses fetched successfully",
            addresses
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

});

router.put("/:id", authMiddleware, async (req, res) => {

    try {

        const updatedAddress = await Address.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedAddress) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        res.status(200).json({
            message: "Address updated successfully",
            address: updatedAddress
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

});

router.delete("/:id", authMiddleware, async (req, res) => {

    try {

        const deletedAddress = await Address.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!deletedAddress) {
            return res.status(404).json({
                message: "Address not found"
            });
        }

        res.status(200).json({
            message: "Address deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

});

module.exports = router;