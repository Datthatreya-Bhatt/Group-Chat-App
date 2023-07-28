const {Chat} = require('../models/database');

//this new function created so every time frontend makes call for count, we just want to give count only thus redusing data quantity.

exports.getCount = async (req,res,next)=>{
    try{
        let count = await Chat.count();
        res.json(count);
    }catch(err){
        console.trace(err);
    }
};