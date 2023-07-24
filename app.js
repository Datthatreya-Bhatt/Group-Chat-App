const express = require('express');
const parser = require('body-parser');

const signupRoute = require('./routes/signup');

const app = express();


app.use(express.static('public'));

app.use(parser.urlencoded({extended:false}));
app.use(parser.json());

app.use(signupRoute);

app.listen(process.env.PORT || 3000);