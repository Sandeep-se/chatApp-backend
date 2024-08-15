const User=require('../models/user')
const bcrypt=require('bcryptjs')
const setCookie=require('../jwtToken')

const signIn=async(req,res)=>
{
    try{
        const {username,password}=req.body
        const check=await User.findOne({username})
        if(!check)
        {
            return res.json({message:'username is incorrect'})
        }

        const Pass=await bcrypt.compare(password,check.password)

        if(!Pass)
        {
            return res.json({message:'password is incorrect'})
        }

        setCookie(check._id.toString(),res)
        return res.json({message:'login success',id:check._id,name:check.fullname})
    }   
    catch(error)
    {
        console.log(error)
        return res.json({error:error})
    }
}
module.exports=signIn