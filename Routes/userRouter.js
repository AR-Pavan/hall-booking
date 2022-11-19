const express = require("express");
const router = express.Router();
const User = require("../Models/user");

//adding new user
router.post("/register",async(req,res)=>{
    try{
        const newUser = await User.create(req.body);
        res.status(200).send(newUser);
    }catch(err){
        res.status(500).send({msg:err.message});
    }
})

//getting all the users
router.get("/",async(req,res)=>{
    try{
        const getAll = await User.find({},{password:0});
        res.status(200).send(getAll);
    }catch(err){
        res.status(500).send({msg:err});
    }
})

//get user by ID
router.get("/:id",async(req,res)=>{
    try{
        const getUser = await User.find({_id:req.params.id},{password:0});
        res.status(200).send(getUser)
    }catch(err){
        res.status(500).send({msg:err})
    }
})

module.exports = router;