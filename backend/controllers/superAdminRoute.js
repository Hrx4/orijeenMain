const asyncHandler = require("express-async-handler");
const studentModels = require("../models/studentModels");

const getAdmin = asyncHandler((req , res) => {
    const { userName , password} = req.body;
     if(userName!=='username' || password!=='password') return res.status(404).json({message:"Wrong username or password"})
     res.status(200).json({message:`Welcome , Admin`})
});

module.exports = {getAdmin}