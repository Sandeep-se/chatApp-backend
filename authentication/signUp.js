const User=require('../models/user')
const bcrypt = require('bcryptjs');
const setCookie=require('../jwtToken')

const signUp=async(req,res)=>
{
    try {
        const {fullname,username,password}=req.body
        // console.log({fullname,username,password})
        const check=await User.findOne({username})

        if(check)
        {
            setCookie(check._id,res)
            return  res.json({message:'user already exited',id:check._id})
        }
        const salt=await bcrypt.genSalt(10);
        const hashedpass=await bcrypt.hash(password,salt)
        const newUser=new User({fullname,username,password:hashedpass})
        await newUser.save();

        setCookie(newUser._id.toString(),res)
        res.json({message:'signUp success',id:newUser._id})
    } catch (error) {
        console.log(error)
        res.json({error:'server error'})
    }
}
module.exports=signUp