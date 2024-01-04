const express = require('express');
const { createExpense, getExpense, deleteExpense, updateExpense } = require('../controllers/expenseControllers');

const router= express.Router()

router.route('/').post(createExpense).get(getExpense);
router.route('/:id').delete(deleteExpense).put(updateExpense);


module.exports = router