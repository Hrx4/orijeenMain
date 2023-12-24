const express = require('express');
const { createSubject, getSubject, deleteSubject } = require('../controllers/subjectControllers');

const router= express.Router()

router.route('/').post(createSubject).get(getSubject);
router.route('/:id').delete(deleteSubject);


module.exports = router