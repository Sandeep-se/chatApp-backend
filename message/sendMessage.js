const Conversation=require('../models/conversation')
const Message=require('../models/message.js')

const sendMessage=async(req,res)=>{
    try {
        const {message}=req.body
        const {userId:receiverId}=req.params;
        const senderId=req.user._id;
        console.log({message,receiverId,senderId})
        let conversation=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]},
        })
        
        if(!conversation)
        {
            conversation=await Conversation.create({
                participants:[senderId,receiverId]
            })
        }
        const newMessage=new Message({senderId,receiverId,message})

        if(newMessage)
        {
            conversation.messages.push(newMessage._id)
        }
        // await conversation.save()
        // await newMessage.save()
        await Promise.all([conversation.save(),newMessage.save()])
        const setData=await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        }).populate("messages")
        console.log(setData.messages)
        const io=req.app.get('socket')
        io.emit('setData',setData.messages)
        res.json({message:'message sent success',newMessage})
    } catch (error) {
        console.log(error)
        res.json({message:error.message})
    }
}
 module.exports=sendMessage