const router=require('express').Router();
const User=require("../models/userModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');
const Inventory= require("../models/inventoryModel");
const mongoose = require("mongoose");

//Register new user

router.post("/register", async(req,res)=>{
    try{
        //check if user already exists
        let user=await User.findOne({email: req.body.email});
        if(user){
            return res.send({
                message: "User already exists",
                success: false,
            });
        }

        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(req.body.password,salt);
        req.body.password=hashedPassword;
        const newUser=new User(req.body);
        await newUser.save();
        return res.send({
            message: "User registered successfully",
            data: null,
            success: true,
        });
    }
    catch(error){
        return res.send({
            message: error.message,
            success: false,
        });
    }
});


//Login user account

router.post("/login", async(req,res)=>{
    try{
        //Check if user exists
        let user=await User.findOne({email: req.body.email});
        if(!user){
            return res.send({
                message: "User doesn't exists",
                success: false,
            });
        }

        // check if userType matches
        if (user.userType !== req.body.userType) {
            return res.send({
            success: false,
            message: `User is not registered as a ${req.body.userType}`,
            });
        }

        //Check if password is correct
        const validPassword= await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.send({
                message: "Invalid Password",
                success: false,
            });
        }

        //Generate Token
        const token= jwt.sign( {userId : user._id}, process.env.TOKEN_SECRET, { expiresIn:"1d"} );
        return res.send({
            message: "User logged in successfully",
            data: token,
            success: true,
        });
    }
    catch(error){
        return res.send({
            message: error.message,
            success: false,
        });
    }
});


// Get user info

router.post("/get-current-user", authMiddleware , async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        user.password="****";
        return res.send({
            message: "User info fetched successfully",
            data: user,
            success: true,
        });
    } catch (error) {
        return res.send({
            message: error.message,
            success: false,
        });
    }
});


// Get all unique donors of organization

router.get("/get-all-donors", authMiddleware, async (req, res) => {
    try {
        // get all unique donor ids from inventory
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueDonorIds = await Inventory.distinct("donor", {organization});
  
        const donors = await User.find({
            _id: { $in: uniqueDonorIds },
        });
    
        return res.send({
            success: true,
            message: "Donors fetched successfully",
            data: donors,
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message
      });
    }
});
  
// Get all unique hospitals of organiztion

router.get("/get-all-hospitals", authMiddleware, async (req, res) => {
    try {
        // get all unique hospital ids from inventory
        const organization = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueHospitalIds = await Inventory.distinct("hospital", {organization});
    
        const hospitals = await User.find({
            _id: { $in: uniqueHospitalIds },
        });
    
        return res.send({
            success: true,
            message: "Hospitals fetched successfully",
            data: hospitals,
        });

    } catch (error) {
        return res.send({
            success: false,
            message: error.message,
        });
    }
});



// Get all unique organizations for a donor

router.get("/get-all-organizations-of-a-donor", authMiddleware, async (req, res) => {
    try {
        // get all unique hospital ids from inventory
        const donor = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueOrganizationIds = await Inventory.distinct("organization", {donor});
  
        const donors = await User.find({
          _id: { $in: uniqueOrganizationIds },
        });
  
        return res.send({
          success: true,
          message: "Organizations fetched successfully",
          data: donors,
        });
    } catch (error) {
            return res.send({
                success: false,
                message: error.message,
            });
    }
});
  
  
// Get all unique organizations for a hospital

router.get("/get-all-organizations-of-a-hospital", authMiddleware, async (req, res) => {
    try {
        // get all unique organizations ids from inventory
        const hospital = new mongoose.Types.ObjectId(req.body.userId);
        const uniqueOrganizationIds = await Inventory.distinct("organization", {hospital});
  
        const hospitals = await User.find({
          _id: { $in: uniqueOrganizationIds },
        });
  
        return res.send({
          success: true,
          message: "Organizations fetched successfully",
          data: hospitals,
        });
    } catch (error) {
        return res.send({
          success: false,
          message: error.message,
        });
    }
});


module.exports = router;