const asyncHandler = require("express-async-handler");
const studentModels = require("../models/studentModels");

const getStudentDetails = asyncHandler(async(req , res) => {
    const { userName , password} = req.body;
    const student = await studentModels.find({studentEnrollment : userName})
    console.log( student);

    if(student===null) return res.status(404).json({message:"No user found"})
    if(student[0].studentPassword!==password) return res.status(404).json({message:"Wrong username or password"})
     res.status(200).json({message:`Welcome , ${student[0].studentName}` , data:student[0]})
});

module.exports = {getStudentDetails}