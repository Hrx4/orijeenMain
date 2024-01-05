const express = require('express');
const { createExpense, getExpense, deleteExpense, updateExpense, getExpenseDetails } = require('../controllers/expenseControllers');

const router= express.Router()

router.route('/').post(createExpense).get(getExpense);
router.route('/:id').delete(deleteExpense).put(updateExpense);
router.route('/details').get(getExpenseDetails)


module.exports = router