

const mongoose= require ('mongoose')

const connectDB=async ()=>{
    try {
        await mongoose.connect('mongodb+srv://pranavbelorkar16:J2Di1muLUwnd3fwr@carnagpur.8h6lj.mongodb.net/S')
        console.log('mongo connected');
        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports={connectDB}