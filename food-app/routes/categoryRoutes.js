const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createCategoryController, updateCategoryController, getAllCategoryController, deleteCategoryController } = require('../controllers/categoryController');
const router = express.Router();

//routes
//CREATE CATEGORY
router.post('/create',authMiddleware,createCategoryController)

//Get all category
router.get('/getAll',getAllCategoryController)

//Update Category
router.put('/update/:id',authMiddleware,updateCategoryController)

//Delete Category
router.delete('/delete/:id',authMiddleware,deleteCategoryController)
module.exports = router