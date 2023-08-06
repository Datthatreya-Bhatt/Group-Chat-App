const {Chat,User} = require('../models/database');

exports.getLiveGroup = async(req,res,next) =>{

    try{
        let skip = Number(req.params.id);
        let connected = Number(req.userId.connected);
        
       console.trace(skip,connected);
    
        let data = await Chat.findAll({
            attributes: ['id', 'message', 'from', 'to'],
            offset: skip,
            where: {
                to: connected
            },
            include: [
                {model: User, attributes: ['name']}
            ]
        })

        //console.trace(data);

        res.send(data);

    }catch(err){
        console.trace(err);
    }
}