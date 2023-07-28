const path = require('path');

const sequelize = require('../models/sequelize');
const {User,Chat} = require('../models/database');


exports.chatPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', 'chat.html'));
}


exports.postChat = async(req,res,next)=>{
    let {text} = req.body;
    let t = await sequelize.transaction();
    let id = req.userId;

    //console.trace(req.userId, text);
    try{

        let user = await User.findOne({
            where: {
                id: id
            }
        })

        let chat = await Chat.create({
            message: text,
            userId: id,
            name: user.name
        },{transaction: t}
        );

        res.send('success');

        await t.commit();

    }catch(err){
        await t.rollback();
        console.trace(err);
    }

}


exports.getMessages = async (req,res,next)=>{

    try{
        let id = req.params.id;
        console.trace(id);
        let user = await User.findAll({
            attributes :['name'],
            where: {
                loggedIn: true
            }
        });

        let message = await Chat.findAll({
            attributes: ['id','message', 'name'],
            offset: Number(id),
            
        });

        let count = await Chat.count();

        console.log(message);

        res.send({user: user, message: message, count: count});
        
    }catch(err){
        console.trace(err);
    }
};