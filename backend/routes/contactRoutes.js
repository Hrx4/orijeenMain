const express = require('express');
const { createContact, deleteContact, getContact, updateContact } = require('../controllers/contactControllers');

const router= express.Router()

router.route('/').post(createContact).get(getContact);
router.route('/:id').delete(deleteContact).put(updateContact);


module.exports = router