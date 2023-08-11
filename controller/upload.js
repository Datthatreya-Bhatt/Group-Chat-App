require('dotenv').config();
const aws = require('aws-sdk');


const {Chat} = require('../models/database');
const sequelize = require('../models/sequelize');
const services = require('../services/s3service');




exports.upload = async(req,res,next) =>{
    let t = await sequelize.transaction();

    try{
        let id = Number(req.userId.token);
        let connected = Number(req.userId.connected);
        let file = req.file;
        console.trace( file);

        
        let s3 = new aws.S3({
            accessKeyId: process.env.IAM_USER_KEY,
            secretAccessKey: process.env.IAM_USER_SECRET,
          
        });


        let fileName = file.originalname;
        console.trace(fileName);

        const S3res = await services.uploadToS3(file.buffer, file.originalname);
        console.trace(S3res);

        let chat = await Chat.create({
            message: S3res.Location,
            from: id,
            to: connected,
            userId: id,
            groupId: connected,
            media: true
        },{transaction: t}
        );

        res.send(chat);

        t.commit();

    }catch(err){
        t.rollback();
        console.trace(err);
    }


};




















// exports.upload = async(req,res,next)=>{

//     try{

//         let s3 = new aws.S3({
//             accessKeyId: process.env.IAM_USER_KEY,
//             secretAccessKey: process.env.IAM_USER_SECRET,
                      
//         });

//         const upload = multer({
//             storage: multerS3({
//               s3: s3,
//               bucket: process.env.BUCKET_NAME,
//               acl: 'public-read',
//               key: req.file.originalname
//             })
//           });

//           let response = await upload.single('file');

//           console.trace(response);




//     }catch(err){
//         console.trace(err);
//     }


// }



















