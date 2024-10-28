//Get user Controller

const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')

const getUserController = async (req,res)=>{
    try {
        //find user
        const user = await userModel.findById({_id : req.body.id},{_id : 0})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User not found",
            })
        }
        //hide password
        user.password = undefined;
        res.status(200).send({
            success:true,
            message:"User get successfully",
            user
        })
    } catch (error) {
        console.log(res)
        res.status(500).send({
            success: false,
            message: "Error in getting User Api",
            error
        })
    }
}

//Update User
const updateUserController = async(req,res)=>{
    try {
        //find User
        const user = await userModel.findById({_id: req.body.id})
        //validation
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"User not Found",
                error
            })
        }
        //update
        const {userName,address,phone} = req.body
        if(userName) user.userName = userName
        if(address) user.address = address
        if(phone) user.phone = phone
        //save user
        await user.save()
        res.status(200).send({
            success:true,
            message:"User Updated Successfully",
            user

        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Update User Api",
            error
        })
    }
}

//UPDATE USER PASSWORD
const updatePasswordController = async(req,res)=>{
    try {
        //find User
        const user = await userModel.findById({_id:req.body.id})
        //validation
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"User not found"
            })
        }
        //get data from user
        const {oldPassword,newPassword} = req.body
        if(!oldPassword || !newPassword)
        {
            return res.status(500).send({
                success:false,
                message:"Please provide old or new Password"
            })
        }

         //check user password | compare password
        const isMatch = await bcrypt.compare(oldPassword,user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:"Invalid old password",
                user,
            })
        }
        //Hasing password
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(newPassword , salt)
        user.password = hashPassword;
        await user.save();
        res.status(200).send({
            success:true,
            message:"Password Updated"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Update password",
            error
        })
    }
}

//resetPassword
const resetPasswordController = async(req,res)=>{
    try {
        const {email,newPassword,answer}= req.body
        if(!email || !newPassword || !answer ){
            return res.status(500).send({
                status:false,
                message:"Please provide all field",
                error
            })
        }        
        const user = await userModel.findOne({email,answer})
        if(!user)
        {
            return res.status(500).send({
                status:false,
                message:"User Not Found or Invalid answer"
            })
        }
         //Hasing password
         var salt = bcrypt.genSaltSync(10);
         const hashPassword = await bcrypt.hash(newPassword , salt)
         user.password = hashPassword;
         await user.save();
         res.status(200).send({
             success:true,
             message:"Password reset Successfully"
         })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in Password reset Api",
            error
        })
        
    }
}

//Delete User Account 
const deleteUserController = async(req,res)=>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:"User Profile deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status:false,
            message:"Error in deleteUser Api",
            error
        })
    }
}

module.exports = {getUserController,updateUserController,updatePasswordController,resetPasswordController,deleteUserController}