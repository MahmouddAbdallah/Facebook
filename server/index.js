const express = require('express');
const mogran = require("morgan");
const env = require('dotenv')
const cors = require("cors")
const { connectdb } = require("./src/middleware/conntectdb")
const authRouter = require('./src/router/authRouter')
const postRouter = require('./src/router/postRouter')
const userRouter = require('./src/router/userRouter')
//create app
const app = express()

//some config
env.config({ path: './.env' })

//some middleware
app.use(mogran(':method :url :status - :response-time ms')) //log requests to console in dev mode only
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}))
app.use(express.static('./upload'))
//connect db 
connectdb()


//routers
app.use("/auth", authRouter)
app.use("/api/post", postRouter)
app.use("/api/user", userRouter)
app.all("*", (req, res) => {
    try {
        res.status(404).json(`this ${req.originalUrl} is not found`)
    } catch (error) {
        return Promise.reject(new Error(error))
    }
})

//run app
const port = process.env.PORT
app.listen(port, () => {
    console.log(`server run at ${port}`);
})
