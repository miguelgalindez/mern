/**
 * Middleware functions are mainly used to make changes in the request
 * and response objects. They are executed in sequence, one after another,
 * but, just like with Route Hanlders, if it doesn't pass control to 
 * the next one, the request is left hanging. 
 * 
 * If new properties are added to the request or response objects
 * inside a middleware function, the next handler will have access
 * to those new properties
 */

const express=require('express')
const app=express()

app.use((request, response, next) =>{
    request.allowed=Reflect.has(request.query, 'allowme')
    next()
})

app.get('/', (request, response, next)=>{
    if(request.allowed){
        response.send('Hello secret world!')
    }
    else{
        response.send('You are not allowed to enter')
    }
})

app.listen(1337, ()=> console.log('Web server running on port 1337'))