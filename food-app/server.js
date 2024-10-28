const express = require('express')
const colors = require("colors")
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDb = require('./config/db')

//.env configuration
dotenv.config()

//DB connection 
connectDb();

// rest objects 
const app = express();

//Middleware
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

//route
app.use('/api/v1/test',require('./routes/testRoutes'))
app.use('/api/v1/auth',require('./routes/authRoutes'))
app.use('/api/v1/user',require('./routes/userRoutes'))
app.use('/api/v1/restaurant',require('./routes/restaurantRoutes'))
app.use('/api/v1/category',require('./routes/categoryRoutes'))


app.get('/',(req,res)=>{
    return res.status(200).send('<h2>This is the food server....</h2>');
})

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`.blue.bgWhite)
})