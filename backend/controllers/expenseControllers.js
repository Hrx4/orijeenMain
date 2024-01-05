const asyncHandler = require('express-async-handler');
const expenseModels = require('../models/expenseModels');
const teacherPaymentModels = require('../models/teacherPaymentModels');

const createExpense = asyncHandler(async(req , res) => {
    const {expenseTitle , expenseDescription , expenseAmount , expenseDate } = req.body;
    const d = new Date();

    const contact = await expenseModels.create({
        expenseTitle : expenseTitle,
        expenseMonth : d.getMonth() , expenseDescription:expenseDescription , expenseAmount:expenseAmount , expenseDate : expenseDate
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

const getExpenseDetails = asyncHandler(async(req , res)=>{
    const expense = await expenseModels.find();
    const teacher = await teacherPaymentModels.find();

    let monthlyExpense =0;
    let totalExpense = 0;
    const d = new Date();

    expense?.map((item , index)=>{
        if(item.expenseMonth=== d.getMonth()) monthlyExpense+=item.expenseAmount
        totalExpense+=item.expenseAmount
    })
    teacher?.map((item , index)=>{
       if (item.lastExpenseMonth===d.getMonth()) monthlyExpense+=item.paymentMoney
       totalExpense+=item.totalExpense
    })
    res.status(200).json({monthlyExpense : monthlyExpense , totalExpense:totalExpense , totalTeacher : teacher.length})
})



module.exports = {createExpense , getExpense  , deleteExpense , updateExpense , getExpenseDetails}