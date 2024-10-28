const testUserController = (req,res)=>{
    try
    {
        res.status(200).send({
           success : true,
           message : "This is the test controller"

        })
    }
    catch
    {
        console.log("Error in Test Api",error)
    }
}

module.exports = { testUserController }