const express = require('express');
const { registerController, loginController } = require('../controllers/authControllers');

const router = express.Router();


//routes 
//Register router | post
router.post('/register', registerController)

//Login | POST
router.post('/login', loginController)

module.exports = router