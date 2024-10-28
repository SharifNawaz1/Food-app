const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')

//Register
const registerController = async (req,res) => {
 try {

    const {userName,email,password,address,phone,userType,profile,answer} = req.body;
    //validation
    if(!userName || !email || !password || !phone || !answer){
        return res.status(500).send({
            success:false,
            meassage:'Please Provide all the fields',
        })
    }
    // CheckUser
    const existingUser = await userModel.findOne({email})
    if(existingUser)
    {
        return res.status(500).send({
            success:false,
            meassage:'User Already Exist Please login',
        })

    }
    //Hasing password
    var salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password , salt)
    //NewUser
    const user = await userModel.create({userName,email,password:hashPassword,address,phone,userType,profile,answer})
    return res.status(201).send({
        success:true,
        meassage:'Successfully Registered',
    })
 } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in register API'
    })
 }
}

//Login Controller

const loginController = async (req,res)=>{
   try {
    const {email,password} = req.body;
    //validation 
    if(!email || !password){
        res.status(500).send({
            success:false,
            message:"Please fill Email Or Password",
        })

    }
    //Check user
    const user = await userModel.findOne({email});
    if(!user){
        res.status(404).send({
            success:false,
            message:"User Not Found"
        })
    }

    //check user password | compare password
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(500).send({
            success:false,
            message:"Invalid Credentials",
            user,
        })
    }

    //tocken
    const token = JWT.sign({id:user._id},process.env.JWT_SECRET ,{
        expiresIn:"7d",
    })
    res.status(200).send({
        success:true,
        message:"Login Successfully ",
        token,
        user
    })
    
    
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:"Error in login API",
        error
    })
   }
}

module.exports = { registerController , loginController }