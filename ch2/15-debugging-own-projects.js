const express=require('express')
const app=express()
const debug=require('debug')('myapp')

app.get('*', (request, response, next)=>{
    debug('Request: ', request.originalUrl)
    response.send('Hello there!')
})

app.listen(1337, ()=>console.log('Server running on 1337'))
/**
 * Start the application server with this command
 *      DEBUG=myapp node 14-debugging-own-projects.js
 * 
 * You can use the DEBUG environment variable to tell 
 * the debug module to displays logs not only for myapp
 * but also for ExpressJS like so:
 *      DEBUG=myapp,express:* node myapp.js
 */