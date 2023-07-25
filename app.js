const express = require('express');
const parser = require('body-parser');
const cors = require('cors');

const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');


const app = express();


app.use(express.static('public'));

app.use(parser.urlencoded({extended:false}));
app.use(parser.json());

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(signupRoute);
app.use(loginRoute);


app.listen(process.env.PORT || 3000);