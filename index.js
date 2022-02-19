const express=require('express')
const app=express()
const port=process.env.PORT || 3000

app.get('/',async(req,res)=>{
    res.send('I am a vey good boy')
})

app.listen(port,()=>{
    console.log('Server running at '+ port)
})