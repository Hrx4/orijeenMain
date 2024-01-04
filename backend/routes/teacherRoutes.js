const express = require('express');
const { createTeacher, getTeacher, deleteTeacher, updateTeacher } = require('../controllers/teacherControllers');

const router= express.Router()

router.route('/').post(createTeacher).get(getTeacher);
router.route('/:id').delete(deleteTeacher).put(updateTeacher);


module.exports = router