const path = require('path');

const {Group, Contact} = require('../models/database');
const sequelize = require('../models/sequelize');

exports.getJoinGropPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', 'joinGroup.html'));
}

exports.getGroupName = async(req,res,next)=>{
    let {link} = req.body;
    try{
        let name = await Group.findOne({
            attributes: ['name', 'link'],
            where: {
                link: link 
            }
        })

        res.send(name);

        //console.trace(link, name);

    }catch(err){
        console.trace(err);
    }
}


exports.joinGroup = async(req,res,next)=>{
    let user = req.userId.user;
    let connected = req.userId.connected;
    let t = await sequelize.transaction();

    console.trace(user, connected);
    try{
        let data = await Contact.findOrCreate({
            where: {
                from: user,
                group: connected
            },
            defaults: {
                from: user,
                group: connected
            },
            transaction: t

        })

        res.send(data);
        await t.commit();
    }catch(err){
        await t.rollback();
        console.trace(err);
    }
}