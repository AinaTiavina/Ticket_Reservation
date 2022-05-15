const express = require('express');
const router = express.Router();

router.get('/events')
router.post('/events')
router.get('/event/:id')
router.put('/event/:id')
router.delete('/event/:id')

module.exports = router;