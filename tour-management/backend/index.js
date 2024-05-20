import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './routers/tours.js';
import userRoute from './routers/users.js';
import authRoute from './routers/auth.js';

dotenv.config();
const app = express();
const port = 4000;

mongoose.set("strictQuery", false);
const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB database connected');
    } catch (err) {
        console.log('MongoDb database connection failed');
    }
}

app.get("/", (req,res) => {
    res.send("api is working");
});

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/auth", authRoute);
app.use("/tours", tourRoute);
app.use("/users", userRoute);

app.listen(port, ()=> {
    connect();
    console.log('server listening on port', port);
})

  