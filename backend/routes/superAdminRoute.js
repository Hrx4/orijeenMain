const express = require('express');
const { getAdmin } = require('../controllers/superAdminRoute');

const router= express.Router()

router.route('/').post(getAdmin)


module.exports = router