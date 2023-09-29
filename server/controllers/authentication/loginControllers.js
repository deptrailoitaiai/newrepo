const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connectdb = require('../../config/mssql');
require('dotenv').config();

module.exports.loginControllers_dataProcessing = async function(req, res){
    try{
        const username = req.body.username;
        const password = req.body.password;

        const findUser = await loginRouter_authentication_findUser(username);
        const hashCompare = await loginRouter_authentcation_hashCompare(password, findUser.password);
        const jwtToken = await loginRouter_authentication_jwtToken(findUser.name, findUser.email);

        return res.json({
            completed: true,
            data: {
                token: jwtToken,
                // session id
            },
            error: {
                code: 0,
            }
        })

    } catch (error) {
        if(error.messae == 'email not found'){
            return {
                completed: false,
                data: {},
                error: {
                    code: 101,
                }
            }
        }

        if(error.messae == 'password incorrect'){
            return {
                completed: false,
                data: {},
                error: {
                    code: 102,
                }
            }
        }
    }
}

async function loginRouter_authentication_findUser(username){
    try {
        const pool = await connectdb.connect();
        const request = await pool.request();
        const queries = `SELECT username, password, name, email FROM users WHERE username = '${username}'`;
        const data = await request.query(queries);
        console.log(data);

        if(data.recordset.length == 0){
            throw new Error('email not found');
        };

        return {
            password: data.recordset[0].password,
            name: data.recordset[0].name,
            email: data.recordset[0].email,
        };
    } catch (error) {
        throw error;
    }
}

async function loginRouter_authentcation_hashCompare(password, hash){
    try {
        const compare = await bcrypt.compare(password, hash);
        console.log(compare);
        
        if(compare == false){
            throw new Error('password incorrect');
        }
    } catch (error) {
        throw error;
    }
}

async function loginRouter_authentication_jwtToken(name, email){
    try {
        const accessToken = await jwt.sign({name: name, email: email}, process.env.JWT_KEY);
        console.log(accessToken);
        return accessToken;
    } catch (error) {
        throw error;
    }
}