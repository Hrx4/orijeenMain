const contactModels = require('../models/contactModels');
const asyncHandler = require('express-async-handler');

const createContact = asyncHandler(async(req , res) => {
    const {contactName , contactEmail,contactPhone , contactMessage} = req.body;
 
    const contact = await contactModels.create({
        contactName , contactEmail,contactPhone , contactMessage
    })
    res.status(200).json(contact);

})


const getContact = asyncHandler(async(req , res) => {
    const contacts = await contactModels.find()
    res.status(200).json(contacts);
})

const deleteContact = asyncHandler(async(req , res) => {
    const contact = await contactModels.findById(req.params.id);
    console.log(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    await contactModels.deleteOne({_id:req.params.id})
    res.status(200).json(contact);
})


const updateContact = asyncHandler(async(req , res) => {

    const {contactName , contactEmail ,contactPhone, contactMessage} = req.body

    const contact = await contactModels.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    const updatedContact = await contactModels.findByIdAndUpdate(
        req.params.id,
        {
            contactName : contactName , 
            contactEmail : contactEmail , 
            contactPhone : contactPhone,
            contactMessage : contactMessage
        }
    )

    res.status(201).json(contact);
})




module.exports = {createContact , getContact  , deleteContact , updateContact}