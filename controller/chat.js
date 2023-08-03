const path = require('path');
const {Op} = require('sequelize');

const sequelize = require('../models/sequelize');
const {User,Chat,Contact} = require('../models/database');



exports.chatPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', 'chat.html'));
}


exports.postChat = async(req,res,next)=>{
    let {text} = req.body;
    let t = await sequelize.transaction();
    let id = Number(req.userId.token);

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

exports.getContacts = async(req,res,next)=>{
    let user = req.userId.user;
    console.trace(user);
    
    try{
        let contacts = await Contact.findAll({
            // include: [{model: User, }],
            where: {
               [Op.or]: [
                    {from: user},
                    {to: user}
               ],
            // include: {
            //      model: User,
            //      attributes: ['name'] 
            //    }
            }
            
        })
        if(contacts){
            console.trace(contacts);
            res.send(contacts);    
        }
        else{
            console.trace(contacts);
            res.send('no contacts');
        }
    }catch(err){
        console.trace(err);
    }


};

exports.getFriend = async(req,res,next)=>{
    let cred = req.body.cred;
    console.trace(cred);
    try{
        let user = await User.findOne({
            where: {
                [Op.or]: [
                    {email: cred}
                ]
            }
        })

        if(user.email === cred || user.phoneNumber ===  Number(cred)){
            //console.trace(user);
            res.send('found');
        }
        else{
            console.trace(user);
            res.send('not found');
        }
    }catch(err){
        console.trace(err);
    }
};

exports.addContact = async(req,res,next)=>{
    let connected = req.body.email;
    let  user = req.userId.user;
    let t = await sequelize.transaction();

    console.trace(connected, user);

    //console.trace(email, id);

    try{
        
        let data = await Contact.findOrCreate({
            where: {
                [Op.or]: [
                    {from: user, to: connected},
                    {from: connected, to: user}
                ]
            },
            defaults: {
               from: user,
               to: connected
            },
            transaction: t
        })

        //console.trace(data);
        res.send(data);
        await t.commit();

    }catch(err){
        await t.rollback()
        console.trace(err);
    }
}


exports.getIndividualChat = async (req,res,next)=>{
    let user = req.userId.user;
    let connected = req.userId.connected;

    console.trace(user, connected);

    try{
        let data = await Chat.findAll({
            attributes : ['id','message', 'from', 'to'], 
            where: {
                [Op.or]: [
                    {from: user, to:connected},
                    {from: connected, to: user}
                ]
                
            }
        })

        console.trace(data);
        res.send(data);

    }catch(err){
        console.trace(err);
    }

};



exports.getGroupChat = async (req,res,next)=>{
    let connected = req.userId.connected;

    console.trace(connected);

    try{
        let data = await Chat.findAll({
            attributes : ['id','message', 'from', 'group'], 
            where: {
                    group: connected
            }
        })

        console.trace(data);
        res.send(data);

    }catch(err){
        console.trace(err);
    }
};


exports.postIndividualChat = async (req,res,next)=>{
    let user = req.userId.user;
    let connected = req.userId.connected;
    let {text} = req.body;

    console.trace(typeof(user), typeof(connected), typeof(text));

    try{

        let data = await Chat.create({
            message: text,
            from: user,
            to: connected

        })

        console.trace(data);
        res.send(data);

    }catch(err){
        console.trace(err);
    }

};



exports.postGroupChat = async (req,res,next)=>{
    let user = req.userId.user;
    let connected = req.userId.connected;
    let {text} = req.body;


    console.trace(user, connected, text);

    try{
        let data = await Chat.create({
            message: text,
            from: user,
            group: connected

        })


        console.trace(data);
        res.send(data);
        
    }catch(err){
        console.trace(err);
    }
};


