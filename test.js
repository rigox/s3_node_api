const fs = require("fs")
const AWS =  require("aws-sdk")
const  dotenv =  require('dotenv')
const express =  require("express")
const app = express()
const  cors =   require("cors")
const  uuid =  require("uuid")

dotenv.config({path:'./config/config.env'})



 AWS.config.update({
    accessKeyId:'AKIAWAOUREEWWQBVKEUP',
    secretAccessKey: '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'
    });
    
fs.readFile('smile.jpeg',function(err,data){
      if(err){
           throw err
      }
      let s3 =  new AWS.S3()
      let base64 =  new Buffer(data,'binary')
      let params = {
           Key:'',
           Bucket:'rigo002',
           Body:base64,
           ACL: 'public-read',
      }
      console.log('params',params)
      s3.putObject(params,function(err,data){
           if(err){console.log(err)}
           console.log(`file uploaded`)
      })
})







