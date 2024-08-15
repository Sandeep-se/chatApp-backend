const jwt=require('jsonwebtoken')
const User=require('../models/user')

const checUser=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        
        if(!token)
        {
            return res.json({messsage:'unauthorized'})
        }
        const decode=jwt.verify(token,process.env.JWT_TOKEN)
        
        const user=await User.findById(decode.userId).select('-password')
        if(!user)
        {
            return res.json({messsage:'user not found'})
        }
        req.user=user
        next()

    } catch (error) {
        console.log(error.messsage)
        res.json({error:error.messsage})
    }
}

module.exports=checUser