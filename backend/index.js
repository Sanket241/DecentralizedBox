import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import ConnectDb from './db/conn.js';
import Authcontroller from './Routes/Authroute.js';
const port = process.env.PORT || 3000;
import path from 'path';

const __dirname = path.resolve();

app.use(cors());
app.use(express.json());

app.use('/api/auth',Authcontroller);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})



app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({success:false,statusCode,message});
})


const start = async () => {
    try {
        await ConnectDb(process.env.MONGO_URL);
        app.listen(port, () => {
            console.log(`server is started at port ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();