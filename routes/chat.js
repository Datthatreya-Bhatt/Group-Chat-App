const express = require('express');

const chatController = require('../controller/chat');
const auth = require('../middleware/auth');


const router = express.Router();

router.get('/chat', chatController.chatPage);
router.post('/chat', auth.auth ,chatController.postChat);

router.get('/chat/contacts',auth.auth,chatController.getContacts);

router.get('/chat/i',auth.auth,chatController.getIndividualChat);
router.get('/chat/g',auth.auth,chatController.getGroupChat);

router.post('/chat/i',auth.auth,chatController.postIndividualChat);
router.post('/chat/g',auth.auth,chatController.postGroupChat);

router.post('/search',auth.auth,chatController.getFriend);
router.post('/addcontact',auth.auth,chatController.addContact);



module.exports = router;