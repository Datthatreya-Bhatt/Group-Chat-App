const path = require('path');
const {v4: uuid } = require('uuid');


const {Group, Contact} = require('../models/database');
const sequelize = require('../models/sequelize');


let url = 'http://localhost:3000';


exports.getCreateGropPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', 'createGroup.html'));
}

exports.createGroup = async(req,res,next)=>{
    let {name} = req.body;
    let user = req.userId.user;
    let t = await sequelize.transaction();
    let uid = uuid();
    let link = `${url}/join/${uid}`;
    

    try{

        //find name of group if not exist then create
        let data = await Group.findOrCreate({
            where: {
                name: name
            },
            defaults: {
                name: name,
                link: link,
                admin: user
             },
             transaction: t

        })

        let contact = await Contact.create({
            from: user,
            group: name
        })

        if(data[0].admin != user){
            res.send('failed');
        }
        else{
            res.send(data[0]);
        }

        await t.commit();

    }catch(err){
        await t.rollback();
        console.trace(err);
    }
};