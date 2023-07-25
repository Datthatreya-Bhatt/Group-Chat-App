const express = require('express');

const chatController = require('../controller/chat');
const auth = require('../middleware/auth');


const router = express.Router();

router.get('/chat', chatController.chatPage);
router.post('/chat', auth.auth ,chatController.postChat);



module.exports = router;