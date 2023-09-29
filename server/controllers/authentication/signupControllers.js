const bcrypt = require('bcrypt');
const connectdb = require('../../config/mssql');
require('dotenv').config();

const example = {
    username: 'username',
    password: 'password',
    name: 'example',
    number: 'number',
    email: 'email',
}

module.exports.signupControllers_createUser = async function(req, res){
    try {
        const data = req.body;
        console.log(data);

        await existedAccount(data.username, data.email);
        const hash = await hashPassword(data.password);
        await insertData(data, hash);
        return res.json({
            completed: true,
            data: {},
            error: {
                code: 0,
            }
        });

    } catch (error) {
        if(error.message == 'account existed'){
            return res.json({
                completed: false,
                data:{},
                error: {
                    code: 100,
                }
            });
        } else {
            console.log(error);
        }
    }
}

async function existedAccount (username, email){
    try {
        const pool = await connectdb.connect();
        const request = pool.request();
        const queries = `SELECT username FROM users WHERE username = '${username}' or email = '${email}'`;
        const data = await request.query(queries);

        if(data.recordset.length != 0){
            throw new Error('account existed');
        }

        return;

    } catch (error) {
        throw error;
    }
};

async function hashPassword (password){
    try {
        const hash = bcrypt.hash(password, 10);
        return hash;
    } catch (error) {
        throw error;
    }
}

async function insertData (data, hash){
    try {
        const pool = await connectdb.connect();
        const request = pool.request();
        const queries = `INSERT INTO users(username, password, name, number, email) VALUES ('${data.username}', '${hash}', '${data.name}', '${data.number}', '${data.email}')`;
        const afterInsert = await request.query(queries);
        console.log(afterInsert);
        return;
        
    } catch (error) {
        throw error;
    }
}


