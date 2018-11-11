/**
 * Creating a Redux store
 */

const express=require('express')
const path=require('path')
const app=express()
/**
 * Serving the Redux library on /lib path
 */
app.use('/lib', express.static(path.join(__dirname, 'node_modules', 'redux', 'dist')))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '3-meal-time-client.html'))
})

app.listen(1337, ()=>console.log('Server running on port 1337'))