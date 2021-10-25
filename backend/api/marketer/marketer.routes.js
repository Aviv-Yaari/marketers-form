const express = require('express');
const { addMarketer, getMarketers, deleteMarketer } = require('./marketer.controller');
const router = express.Router();

router.get('/', getMarketers);
router.post('/', addMarketer);
router.delete('/:id', deleteMarketer);

module.exports = router;
