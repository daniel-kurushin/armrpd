const express = require('express');
const router = express.Router();

const doc = require('../auth/docx.func');

router.post('/generate', doc.generateDocx);
router.get('/get', doc.getDocx);

module.exports = router;