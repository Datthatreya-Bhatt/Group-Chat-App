require('dotenv').config();
const jwt = require('jsonwebtoken');

const {GroupsUser} = require('../models/database');


const io = require('socket.io')(3001, {
    cors: {
        origin: ['http://localhost:3000']
    }
});


let auth = async(cred)=>{
    try{
        cred = JSON.parse(cred);
        let id = jwt.verify(cred.token, process.env.JSON_SECRET_KEY);
        id = Number(id);

        let data = await GroupsUser.findOne({
            where: {
                userId: id,
                groupId: cred.connected
            }
        })

        if(data.userId === id && data.groupId === cred.connected){
        return data
        }
        return false
    }catch(err){
        console.trace(err);
    }
}


io.on('connection', socket =>{
    
    socket.on('join-group',async group =>{
        let pass = await auth(group);

        if(pass){
            socket.join(pass.groupId);
        }
        else{
            socket.emit('join-group-failed', 'You have no permission');
        }
    })

    //listening events from client
    socket.on('send-msg', async (msg, room)=>{
        
        let pass = await auth(room);
        
        if(pass){
            socket.to(pass.groupId).emit('receive-msg',msg)

        }
        else{
            //sending event to frontend
            socket.emit('send-message-failed', 'You have no permission');
        }
    })

})
