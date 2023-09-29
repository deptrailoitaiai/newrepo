const express = require('express');
const router = express.Router();
const axios = require('axios');
const loginControllers = require('../../controllers/authentication/loginControllers');

router.post('/', async (req, res) => {
    loginControllers.loginControllers_dataProcessing(req, res);
});

module.exports = router;