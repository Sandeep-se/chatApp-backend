const User=require('../models/user')

const getUsers=async(req,res)=>{
    try {

        const userId=req.user._id;
        // console.log(req.user)
        const filterUsersId=await User.find({_id:{$ne:userId}}).select("-password")

        res.json({message:filterUsersId})
    } catch (error) {
        console.log(error.message)
        res.json({error:error.message})
    }
}

module.exports=getUsers
