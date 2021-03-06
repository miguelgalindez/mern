const express=require('express')
const app=express()
/**
 * A router is an instance of ExpressJS' core routing system
 * that allows developers to write mountable and modular
 * route handlers. Routers are usually referred to as
 * mini-applications because they can be mounted to an ExpressJS
 * application's specific routes to different mount points, paths
 * or URIs
 */
const miniapp=express.Router()


miniapp.get('/home', (request, response, next)=>{    
    response.status(200).send(`You are visiting /home from ${request.originalUrl}`)
})

/**
 * A router was mounted to two different mount points. 
 * /first and /second
 * */ 
app.use('/first', miniapp)
app.use('/second', miniapp)

app.listen(1337, ()=> console.log('Web server runnig on port 1337'))