const express = require('express');
const { cretaeCCourse, getCourse, deleteCourse } = require('../controllers/courseControllers');

const router= express.Router()

router.route('/').post(cretaeCCourse).get(getCourse);
router.route('/:id').delete(deleteCourse);


module.exports = router