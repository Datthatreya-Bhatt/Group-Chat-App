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
    from:{
        type: DataTypes.STRING,
        allowNull: false
    },
    to:{
        type: DataTypes.STRING,
        allowNull: true
    },
    group: {
        type: DataTypes.STRING,
        allowNull: true
    }
})


const Group = sequelize.define('group',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    admin: {
        type: DataTypes.STRING,
        allowNull: false
    }
});


const Contact = sequelize.define('contact',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
     from:{
        type: DataTypes.STRING,
        allowNull: false
    },
    to:{
        type: DataTypes.STRING,
        allowNull: true
    },
    group: {
        type: DataTypes.STRING,
        allowNull: true
    }


})


// user and contacts many to many because we need contacts name in place of from and to









async function createTable(obj){
    try{
        await obj.sync({force: false});

        console.log(`${obj} tables created successfully`);
    }catch(err){
        console.trace(err);
    }
}


const execute = async ()=>{
    await createTable(User);
    await createTable(Chat);
    await createTable(Group);
    await createTable(Contact);
   // await createTable(Notification);



}

execute();

module.exports = {
    User: User,
    Chat: Chat,
    Group: Group,
    Contact: Contact,
}


