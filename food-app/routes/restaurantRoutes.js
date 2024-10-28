const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { createRestaurantController, getRestaurantsController, getByIdController, deleteRestaurantController } = require('../controllers/restaurantContoller');
const router = express.Router();


//routes 
//Create Restaurant||POST
router.post('/create',authMiddleware,createRestaurantController)

//Get all Restauranrs || GET
router.get('/getRestaurants',getRestaurantsController)

//Get restaurant by ID
router.get('/get/:id',getByIdController)

//Delete restaurant by ID
router.delete('/delete/:id',authMiddleware,deleteRestaurantController)
module.exports = router