const express = require('express');

const liveMessageController = require('../controller/liveMessage');
const auth = require('../middleware/auth');


const router = express.Router();


router.get('/i/:id',auth.auth,liveMessageController.getLiveIndividual);
router.get('/g/:id',auth.auth,liveMessageController.getLiveGroup);




module.exports = router;