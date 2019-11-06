const express =  require("express")
const aws =  require("aws-sdk")
const fs =  require("fs")
const form = require("formidable")
const  router = express.Router()
const config =  require("config")

aws.config.update({
    accessKeyId:config.get("accessKeyId"),
    secretAccessKey:config.get("secretAccessKey")
})

router.get('/',(req,res)=>{
       res.status(200).json({
            success:true,
            data:'Welcome to the s3 api'
       })
})

router.post('/upload_photo',function(req,res){
    console.log('first'.red)
    const f =  new form.IncomingForm()
    f.parse(req,(err,fields,files)=>{
        console.log('second'.blue)
        if(err){console.log(err)}
        console.log(files)
         var file_path = files.file.path
         var file_name = files.file.name
         fs.readFile(file_path,function(err,data){
            if(err){throw err}
            var base64 =  new Buffer(data,'binary')
            var s3 =   new aws.S3()
            const params = {
                 Bucket:"rigo002",
                 Key:file_name,
                 Body:base64,
                 ACL: 'public-read',
            }
            console.log(params)
            s3.putObject(params,function(err,data){
                if(err){throw  err}
                res.status(200).json({
                     success:true,
                     data:`File uploaded to ${data.Location}`
                })
            });
        });
    })
});

module.exports = router