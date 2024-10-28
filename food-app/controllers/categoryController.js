const categoryModel = require('../models/categoryModel')
const router = require('../routes/categoryRoutes')
//Create Controller
const createCategoryController = async(req,res)=>{
    try {
        const {title,imgUrl} = req.body
        //validation
        if(!title)
        {
            return res.status(404).send({
                status:false,
                message:"Please provide Title or ImgUrl"
            })
        }
        const category = await categoryModel.create({title,imgUrl})
        res.status(200).send({
            status:true,
            message:"Category Created Successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:false,
            message:"Error in Create Category API",
            error
        })
    }
}
//Update Category
const updateCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findById({_id:req.params.id})
        if(!category){
            return res.status(404).send({
                status:false,
                message:"Category Not Found"
            })
        }
        //get data from body
        const {oldTitle,newTitle} = req.body
        if(!oldTitle || !newTitle){
            return res.status(500).send({
                status:false,
                message:"Please Provide Old or New Title"
            })
        }
        category.title = newTitle
        await category.save()
        res.status(200).send({
            status:true,
            message:"Successfully Updated category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:false,
            message:"Error in Update Category API",
            error
        })
    }
}

//Get all Api
const getAllCategoryController = async (req,res)=>{
    try {
        const category = await categoryModel.find({})
        if(!category){
            return res.status(404).send({
                status:false,
                message:"Category not found"
            })
        }
        res.status(200).send({
            status:true,
            message:"Successfully Get All Category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:false,
            message:"Error in Get all Category Api"
        })
    }
}

const deleteCategoryController = async(req,res)=>{
    try {
        const category = await categoryModel.findById({_id:req.params.id})
        if(!category){
            return res.status(404).send({
                status:false,
                message:"Category Not Found"
            })
        }
       await categoryModel.findByIdAndDelete(category)
        res.status(200).send({
            status:true,
            message:"Successfully Deleted category",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:false,
            message:"Error in Delete Category API",
            error
        })
    }
}
module.exports = {createCategoryController,updateCategoryController,getAllCategoryController,deleteCategoryController}