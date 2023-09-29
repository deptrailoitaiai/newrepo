const express = require('express');
const router = express.Router();
const axios = require('axios');
const signupControllers = require('../../controllers/authentication/signupControllers');

router.post('/', (req, res) => {
    signupControllers.signupControllers_createUser(req,res);
})


module.exports = router;
