const express = require("express")
const  dotenv =  require("dotenv")
const color =  require("colors")
const cors = require("cors")
const fileuploader = require("express-fileupload")
const app = express()

//Load  enviromental variables
dotenv.config({path:'./config/config.env'})


//setup cors
app.use(cors())

//Body Parser
app.use(express.json(), express.urlencoded({extended:true}))
 
//setup file upload
//app.use(fileuploader())

//load routes
const s3 =  require("./routes/s3")
//setup routes
app.use('/api/v1/s3',s3)

const PORT  = process.env.PORT || 5001
app.listen(PORT,()=>{
     console.log(`listening on PORT ${PORT}`.red.underline)
});