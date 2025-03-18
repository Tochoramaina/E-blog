import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import userRoutes from './routes/user.route.j'
import authRoutes from "./routes/auth.routes.js"

dotenv.config()
mongoose.connect(process.env.Mongo)
.then(
    () => {
        console.log("mongoDB is connected")
    } 
)
.catch((err) => {
    console.log(err)
}
)

const app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log("server is running at port 3000")
}
) 

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)