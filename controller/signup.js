const path = require('path');


exports.signupPage = (req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname, '../', 'public', 'signup.html'));
} 