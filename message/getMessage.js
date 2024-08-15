const Message=require('../models/message')
const Conversation=require('../models/conversation')

const getMessage=async(req,res)=>{
    try{
        console.log(req.params)
        const {userId:receiverId}=req.params;
        const senderId=req.user._id;
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("messages")
        if(!conversation)return res.json([])

        res.json(conversation.messages)

    }
    catch(error)
    {
        console.log(error.message)
        res.json({error:error.message})
    }
}

module.exports=getMessage