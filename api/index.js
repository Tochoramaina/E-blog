import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv"
import userRoutes from './routes/user.route.js'
import authRoutes from "./routes/auth.routes.js";
import postRoutes from './routes/post.route.js'
import cookieParser from 'cookie-parser'
import commentRoutes from './routes/comment.route.js'
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
app.use(cookieParser())
app.listen(3000, () => {
    console.log("server is running at port 3000")
}
) 

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/post', postRoutes)
app.use('/api/comment', commentRoutes)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    })
})