const express = require('express');
const app = express();
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const loginRouter = require('./routes/authentication/loginRouter');
const signupRouter = require('./routes/authentication/signupRouter');
require('dotenv').config();

app.use(bodyParser.json());

app.use(morgan("combined"));

app.use(session({
    secret: process.env.SESSION_SECRET_KEY, 
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000, 
    }
}));

app.use('/login', loginRouter);
app.use('/signup', signupRouter);


app.listen(process.env.NODE_PORT, () => {
    console.log('app running on port 4000');
})