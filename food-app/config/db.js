const mongoose = require('mongoose')

//function for mongoose db connection 
 const connectDb = async ()=>{
    try
    {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database ${mongoose.connection.host}`.bgGreen)
    }
    catch(error)
    {
        console.log("DB Error", error);
    }
}

module.exports = connectDb;