

const mongoose= require ('mongoose')

const connectDB=async ()=>{
    try {
        await mongoose.connect('mongodb+srv://shardamernstackdev:umU0XVyuTI8Ct0WX@carnagpurs.z098z.mongodb.net/')
        console.log('mongo connected');
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports={connectDB}