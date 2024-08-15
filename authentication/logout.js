const logout=async(req,res)=>
{
    try{
        // res.cookie("jwt","",{maxAge:0,expires: new Date(0)})
        res.clearCookie('jwt',
        {
            path:'/',
            secure:true,
            sameSite:'none'
        })
        res.json({message:'logged out success'})
    }
    catch(error)
    {
        console.log(error)
        res.json({error:error})
    }
}
module.exports=logout