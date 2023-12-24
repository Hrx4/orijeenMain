const express = require('express');
const { deleteClass, cretaeClass, getClass } = require('../controllers/classControllers');

const router= express.Router()

router.route('/').post(cretaeClass).get(getClass);
router.route('/:id').delete(deleteClass);


module.exports = router