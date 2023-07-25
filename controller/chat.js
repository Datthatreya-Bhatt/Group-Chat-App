const path = require('path');

const sequelize = require('../models/sequelize');
const {Chat} = require('../models/database');


exports.chatPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', 'chat.html'));
}


exports.postChat = async(req,res,next)=>{
    let {text} = req.body;
    let t = await sequelize.transaction();
    let id = req.userId;

    console.trace(req.userId, text);
    try{
        let chat = await Chat.create({
            message: text,
            userId: id
        },{transaction: t}
        );

        res.send('success');

        await t.commit();

    }catch(err){
        await t.rollback();
        console.trace(err);
    }

}
