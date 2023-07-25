const path = require('path');


exports.loginPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', 'login.html'));
}