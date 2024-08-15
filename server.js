const express =require('express')
const app=express()
const dotenv=require('dotenv')
const router=require('./router')
const connectDB=require('./db')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const socketIo=require('socket.io')
const http=require('http')
dotenv.config()

connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
app.use(cookieParser())
app.use("/",router)
const server=http.createServer(app)

const io=socketIo(server,{
    cors:{
        origin:'http://localhost:3000',
        methods:["GET","POST"],
        credentials:true
    }
})
app.set('socket',io)

server.listen(8000,()=>{
    console.log('server is connected port 8000');
})

io.on('connection',async(socket)=>{
    console.log('socket connsection is eatablished');
    socket.on('disconnect',()=>{
        console.log('socket connsection is disconnected');
    })
})
