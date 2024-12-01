import express from 'express'
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './Users/userRouter.js';
import captainRouter from './captain/captain_route.js';
const app =express ();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))


connectDB()

//  routes
app.use('/api/users',userRouter)
app.use('/api/captain',captainRouter)

app.get('/',(req,res)=>{
    res.send('hello , this is res of get req')
})

export default app;