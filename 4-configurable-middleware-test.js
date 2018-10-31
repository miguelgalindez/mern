const express=require('express')
const app=express()
const loggerMiddleware=require('./4-middleware-logger')

app.use(loggerMiddleware({
    enable: true
}))

app.listen(1337, ()=> console.log('Web server running on port 1337'))