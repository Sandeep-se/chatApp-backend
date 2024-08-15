const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()

const setCookie=(userId,res)=>
{
    const token=jwt.sign({userId},process.env.JWT_TOKEN,{expiresIn:"15d"})
    console.log(token);
    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        path:'/',
        httpOnly:true,
        secure:true,
        sameSite:'none'
    })
    
}
module.exports=setCookie