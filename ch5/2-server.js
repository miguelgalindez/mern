const express=require('express')
const app=express()
const path=require('path')

app.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '2-meal-time.html'))
})

app.listen(1337, console.log('Server running on port 1337'))