/**
 * ExpressJS already includes by default a built-in error
 * handler which gets executed at the end of all middleware
 * and route handlers
 * 
 * There are ways that the built-in error handler can
 * be triggered. One is implicit when an error occurs 
 * inside a route handler. For example:
 * 
 * app.get('/', (request, response, next) => {
 *      throw new Error('Oh no!, something went wrong!')
 * })
 * 
 * And another way of triggering the built-in error handler
 * is explicit when passing an error as an argument to
 * next(error). For instance:
 * app.get('/', (request, response, next) => {
 * try {
 *      throw new Error('Oh no!, something went wrong!')
 *  } catch (error) {
 *      next(error)
 *  }
 * })
 * 
 * A custom error handler can be written as follows:
 * app.use((error, request, response, next) => {
 *      next(error)
 * })
 * 
 * When NODE_ENV is set to production, the statck trace
 * is not included.
 */

const express=require('express')
const app=express()

app.get('/', (request, response, next)=>{
    try{
        throw new Error('Oh no!, something went wrong')
    } catch(error){
        next(error)
    }
})

app.get('/new', (request, response, next) => {
    next(new Error('Triggering error from route handler with error constructor'))
})

/**
 * Defining a custom error handler middleware function
 * to send the error message back to the client's browser
 */
app.use((error, request, response, next)=>{
    response.end(error.message)
})

app.listen(1337, ()=>console.log('Web app running on port 1337'))