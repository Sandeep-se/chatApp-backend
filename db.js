const mongoose = require('mongoose');

const connectDB=()=>
{
    mongoose.connect("mongodb://127.0.0.1:27017/Chat")
    mongoose.connection.on('error',console.error.bind(console,'cnnection error'))
    mongoose.connection.once('open',()=>console.log('mongodb connected'));
}
module.exports=connectDB
