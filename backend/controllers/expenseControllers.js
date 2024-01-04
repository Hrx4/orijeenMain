const asyncHandler = require('express-async-handler');
const expenseModels = require('../models/expenseModels');

const createExpense = asyncHandler(async(req , res) => {
    const {expenseTitle , expenseDescription , expenseAmount , expenseDate } = req.body;
 
    const contact = await expenseModels.create({
        expenseTitle , expenseDescription , expenseAmount , expenseDate
    })
    res.status(200).json(contact);

})


const getExpense = asyncHandler(async(req , res) => {
    const contacts = await expenseModels.find()
    res.status(200).json(contacts);
})

const deleteExpense = asyncHandler(async(req , res) => {
    const contact = await expenseModels.findById(req.params.id);
    console.log(req.params.id)
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    await expenseModels.deleteOne({_id:req.params.id})
    res.status(200).json(contact);
})


const updateExpense = asyncHandler(async(req , res) => {

    const {expenseTitle , expenseDescription , expenseAmount , expenseDate  } = req.body;

    const contact = await expenseModels.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }

    const updatedContact = await expenseModels.findByIdAndUpdate(
        req.params.id,
        {
            expenseTitle : expenseTitle , expenseDescription:expenseDescription , expenseAmount:expenseAmount , expenseDate : expenseDate
        }
    )

    res.status(201).json(contact);
})




module.exports = {createExpense , getExpense  , deleteExpense , updateExpense}