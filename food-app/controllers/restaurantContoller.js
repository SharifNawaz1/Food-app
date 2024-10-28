const restaurantModel = require("../models/restaurantModel")

//Create Restaurant
const createRestaurantController = async (req,res)=>{
    try {
        const {title,imageUrl,foods,time,pickup,delivery,isOpen,reting,ratingCount,code,coords} = req.body
        
        if(!title || !coords)
        {
            console.log(error)
            return res.status(404).send({
                success:false,
                message:"Please provide title or coords",

            })
        }

        const newRestaurant = new restaurantModel({title,imageUrl,foods,time,pickup,delivery,isOpen,reting,ratingCount,code,coords})
        await newRestaurant.save()
        res.status(200).send({
            success:true,
            message:"Restaurant created successfully"
        })
    } catch (error) {
        console.log(error)
        resizeBy.status(500).send({
            success:false,
            message:"Error in Create Restaurant Api",
            error
        })
    }
}

const getRestaurantsController = async(req,res)=>{
    try {
        const restaurants = await restaurantModel.find({})
        if(!restaurants){
            return res.status(404).send({
                status:false,
                message:"Restaurat not found"
            })
        }
        res.status(200).send({
            success:true,
            totalCount:restaurants.length,
            restaurants
        })
    } catch (error) {
        console.log(error)
        res.status(500),send({
            status:false,
            message:"Error in Get Restaurant Api",
            error
        })
    }
}

//Get by Id
const getByIdController = async(req,res)=>{
    try {
        const resId = req.params.id
        if(!resId)
        {
            return res.status(404).send({
                status:false,
                message:"Restaurat Id not found"
            }) 
        }
        const restaurant  = await restaurantModel.findById(resId)
        if(!restaurant)
        {
            return res.status(404).send({
                status:false,
                message:"Restaurat not found"
            }) 
        }
        res.status(200).send({
            success:true,
            restaurant
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:false,
            message:"Error in Get By Id Api",
            error
        }) 
    }
}

//Delete restaurant by ID
const deleteRestaurantController = async(req,res)=>{
    try {
        const resId = req.params.id
        if(!resId)
        {
            return res.status(404).send({
                status:false,
                message:"Id not FOund"
            })
        }
        const restaurant = await restaurantModel.findByIdAndDelete(resId)
        res.status(200).send({
            success:true,
            message:"Restaurant Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:false,
            message:"Error in Delete Api",
            error
        }) 
    }
}
module.exports = {createRestaurantController,getRestaurantsController,getByIdController,deleteRestaurantController}