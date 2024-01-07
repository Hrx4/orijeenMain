const asyncHandler = require('express-async-handler');
const noteModels = require('../models/noteModels');

const createNote = asyncHandler(async(req , res) => {
    const {noteTitle , noteClass , noteBatch , noteCourse , noteSubject, notePdf } = req.body;
 
    const contact = await noteModels.create({
        noteTitle , noteClass , noteBatch , noteCourse , noteSubject, notePdf
    })
    res.status(200).json(contact);

})



const getNote = asyncHandler(async(req , res) => {
    const contacts = await noteModels.find()
    res.status(200).json(contacts);
})

const getStudentNote = asyncHandler(async(req , res) => {
    const {noteBatch , noteCourse , noteClass} = req.body;
    let notes = await noteModels.find({noteCourse:noteCourse})
        notes = notes.filter((item) => item.noteBatch === noteBatch);
        notes = notes.filter((item) => item.noteClass === noteClass);

          res.status(200).json(notes);
})

const deleteNote = asyncHandler(async(req , res) => {
    const contact = await noteModels.findById(req.params.id);
    console.log(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    await noteModels.deleteOne({_id:req.params.id})
    res.status(200).json(contact);
})


const updateNote = asyncHandler(async(req , res) => {

    const {noteTitle , noteClass , noteBatch , noteCourse , noteSubject, notePdf  } = req.body;

    const contact = await noteModels.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    const updatedContact = await noteModels.findByIdAndUpdate(
        req.params.id,
        {
            noteTitle : noteTitle, noteClass:noteClass , noteBatch:noteBatch , noteCourse : noteCourse , noteSubject :noteSubject, notePdf : notePdf
        }
    )

    res.status(201).json(contact);
})




module.exports = {createNote , getNote  , deleteNote , updateNote , getStudentNote}