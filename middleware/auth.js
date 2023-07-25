require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth = async(req,res,next)=>{
    let token = req.header('Authorization');
    try{
        let id = jwt.verify(token,process.env.JSON_SECRET_KEY);
        //console.trace(id);
        if(id){            
            req.userId = id;
            next()
        }
      
    }catch(err){
        res.redirect('/login');
        console.trace(err);
    }
}
