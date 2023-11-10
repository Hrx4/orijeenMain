const express = require('express');
const { createApply, getApply, deleteApply } = require('../controllers/applyControllers');

const router= express.Router()

router.route('/').post(createApply).get(getApply);
router.route('/:id').delete(deleteApply);


module.exports = router