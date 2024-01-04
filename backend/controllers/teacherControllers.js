const asyncHandler = require('express-async-handler');
const teacherModels = require('../models/teacherModels');

const createTeacher = asyncHandler(async(req , res) => {
    const {teacherName , teacherAge , teacherGender , teacherEducation , teacherAddress , teacherSalary , teacherDoj ,teacherSubject , teacherClass , teacherCourse  } = req.body;
 
    const contact = await teacherModels.create({
        teacherName , teacherAge , teacherGender , teacherEducation , teacherAddress , teacherSalary , teacherDoj ,teacherSubject , teacherClass , teacherCourse 
    })
    res.status(200).json(contact);

})


const getTeacher = asyncHandler(async(req , res) => {
    const contacts = await teacherModels.find()
    res.status(200).json(contacts);
})

const deleteTeacher = asyncHandler(async(req , res) => {
    const contact = await teacherModels.findById(req.params.id);
    console.log(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    await teacherModels.deleteOne({_id:req.params.id})
    res.status(200).json(contact);
})


const updateTeacher = asyncHandler(async(req , res) => {

    const {teacherName , teacherAge , teacherGender , teacherEducation , teacherAddress , teacherSalary , teacherDoj ,teacherSubject , teacherClass , teacherCourse  } = req.body;

    const contact = await teacherModels.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    const updatedContact = await teacherModels.findByIdAndUpdate(
        req.params.id,
        {
            teacherName : teacherName , 
            teacherAge : teacherAge, 
            teacherGender : teacherGender, 
            teacherEducation: teacherEducation , 
            teacherAddress : teacherAddress , 
            teacherSalary: teacherSalary, 
            teacherDoj : teacherDoj ,
            teacherSubject : teacherSubject, 
            teacherClass : teacherClass, 
            teacherCourse : teacherCourse
        }
    )

    res.status(201).json(contact);
})




module.exports = {createTeacher , getTeacher  , deleteTeacher , updateTeacher}