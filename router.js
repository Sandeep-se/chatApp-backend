const express=require('express')
const router=express.Router()
const signIn=require('./authentication/signIn')
const signUp=require('./authentication/signUp')
const logout=require('./authentication/logout')
const sendMessage=require('./message/sendMessage')
const checkUser=require('./middleware/checkUser')
const getMessage=require('./message/getMessage.js')
const getUsers=require('./users/getUsers.js')

router.get('/',(req,res)=>
{
    res.json({server:'hello'})
})

//authentication
router.post('/auth/signIn',signIn)
router.post('/auth/signUp',signUp)
router.post('/auth/logout',logout)

//message
router.post('/message/send/:userId',checkUser,sendMessage)
router.get('/message/get/:userId',checkUser,getMessage)

//users
router.get('/users',checkUser,getUsers);

module.exports=router