const {DataTypes} = require('sequelize');

const sequelize = require('./sequelize');


const User = sequelize.define('user',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    loggedIn:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

const Chat = sequelize.define('chat',{
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    message:{
        type: DataTypes.STRING,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    }
})


User.hasMany(Chat);
Chat.belongsTo(User);

async function createTable(obj){
    try{
        await obj.sync({force: false});

        console.log('tables created successfully');
    }catch(err){
        console.trace(err);
    }
}


const execute = async ()=>{
    await createTable(User);
    await createTable(Chat);

}

execute();

module.exports = {
    User: User,
    Chat: Chat
}


