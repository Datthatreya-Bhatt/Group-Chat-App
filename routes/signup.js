const express = require('express');

const signupController = require('../controller/signup');


const router = express.Router();

router.get('/signup', signupController.signupPage);


module.exports = router;