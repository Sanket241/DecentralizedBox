import mongoose from 'mongoose';

const ConnectDb =async(MONGO_URL)=>{
    try{
        await mongoose.connect(MONGO_URL);
        console.log('Connected to database');
    }
    catch(error){
        console.log(error);
    }
}
export default ConnectDb;