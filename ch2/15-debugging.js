/**
 * Debugging information on ExpressJS about all of the cycle
 * of a web application is something simple. ExpressJS uses
 * the debug NPM module internally to log information. Unlike 
 * console.log, debug logs can easily be disabled on production mode
 */
const express=require('express')
const app=express()

app.get('*', (request, response, next)=>{
    response.send('Hello there!')
})

app.listen(1337, ()=>console.log('Server running on port 1337'))
/**
 * Launch the server application with the following command:
 *      DEBUG=express:* node 14-debugging.js
 * 
 * In the preceding command, express:* tells the debug module 
 * to log everything related to the express application. We could
 * user DEBUG=express:router to display logs related to the Router
 * or routing of ExpressJS
 */