const express = require("express")
const { connection } = require("./Config/db")
const { jobRouter } = require("./Routes/jobRoutes")
require("dotenv").config()
const cors = require("cors")
const PORT = process.env.PORT || 8080
const app = express()
app.use(cors())  
app.use("/job", jobRouter)

app.listen(PORT , async()=> {
     try {
        await connection
        console.log("you are now connected to db")
     } catch (error) {
        console.log(error, "line 13")
     }
     console.log("server running at", PORT)
})