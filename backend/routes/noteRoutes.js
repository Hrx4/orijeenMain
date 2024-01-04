const express = require('express');
const { deleteNote, createNote, getNote, updateNote } = require('../controllers/noteControllers');

const router= express.Router()

router.route('/').post(createNote).get(getNote);
router.route('/:id').delete(deleteNote).put(updateNote);


module.exports = router