const express = require('express');
const multer = require('multer');


const uploadController = require('../controller/upload');
const auth = require('../middleware/auth');

const router = express.Router();

try{

    // // Configure multer for file upload
    const storage = multer.memoryStorage(); // Store files in memory as buffers i have to stream the file s3 in next optimization
    const upload = multer({ storage: storage });

    // Use the upload middleware in the route
    router.post('/chat/upload', auth.auth,upload.single('file'),uploadController.upload);


    module.exports = router;

}catch(err){
    console.trace(err);
}