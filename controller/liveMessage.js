const {Op} = require('sequelize');

const {Chat} = require('../models/database');

exports.getLiveIndividual = async(req,res,next) =>{
    let skip = Number(req.params.id);
    let user = req.userId.user;
    let connected = req.userId.connected;

   // console.trace(skip, user, connected);

    try{
        let data = await Chat.findAll({
            offset: skip,
            where: {
                [Op.or]: [
                    {from: user, to: connected },
                    {from: connected, to: user}
                ]
            }
        })

        res.send(data);

    }catch(err){
        console.trace(err);
    }
}

exports.getLiveGroup = async(req,res,next) =>{
    let skip = Number(req.params.id);
    let connected = req.userId.connected;
    
   // console.trace(skip,connected);

    try{
        let data = await Chat.findAll({
            offset: skip,
            where: {
                group: connected
            }
        })

        res.send(data);

    }catch(err){
        console.trace(err);
    }
}