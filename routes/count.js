const express = require('express');

const countController = require('../controller/count');
const auth = require('../middleware/auth');


const router = express.Router();

router.get('/count', countController.getCount);

module.exports = router;