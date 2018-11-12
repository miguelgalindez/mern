const express=require('express')
const path=require('path')
const app=express()
app.use('/lib', express.static(path.join(__dirname, 'node_modules', 'redux', 'dist')))
app.use('/lib', express.static(path.join(__dirname, 'node_modules')))
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '5-todo-time.html'))
})

app.listen(1337, ()=>console.log('Server running on port 1337'))