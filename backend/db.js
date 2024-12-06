

const mongoose= require ('mongoose')

const connectDB=async ()=>{
    try {
        await mongoose.connect('mongodb+srv://madhupreamcateres:4RghgFlfvBEGyspk@deploy.eyw7q.mongodb.net/deployecar')
        console.log('mongo connected');
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports={connectDB}