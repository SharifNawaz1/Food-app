const express = require('express');
const { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteUserController } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();


//routes 
//GET user | GET
router.get('/getUser', authMiddleware, getUserController)

//UPDATE PROFILE
router.put('/updateUser',authMiddleware, updateUserController)

//Password Update
router.post('/updatePassword',authMiddleware , updatePasswordController)

//reset password
router.post('/resetPassword',authMiddleware,resetPasswordController)

//delete user account
router.delete('/deleteUser/:id',authMiddleware,deleteUserController)
module.exports = router