require('dotenv').config();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const sequelize = require('../models/sequelize');
const {User} =  require('../models/database');


exports.loginPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', 'login.html'));
}

exports.postLogin = async (req,res,next)=>{
    let {email, password} = req.body;
    let t = await sequelize.transaction();

    try{

        let user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user){
            let hash = await bcrypt.compare(password, user.password);
            
            if(hash){
                
                let token = jwt.sign(user.id, process.env.JSON_SECRET_KEY);

                let data = await User.update({
                    loggedIn: true
                },{
                    where:{
                        id: user.id
                    },
                    transaction: t

                })

                console.trace(token, hash);
                
                res.send({token: token});
            }
            else{
                res.send('password inccorect');
            }
        }
        else{
            res.send('email incorrect');
        }

        await t.commit();

    }catch(err){
        await t.rollback();
        console.trace(err);
    }

}