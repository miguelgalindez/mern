/**
 * Dealing with asynchronous data flow
 * 
 * By default, Redux doesn't handle asynchronous data flow. There are
 * several libraries out there that can help you with these tasks.
 * However, for the purpose of this chapter, we will build our own
 * implementation using middleware functions to give the dispatch 
 * method the ability to dispatch and handle asynchronous data flow.
 */
const express=require('express')
const app=express()

app.get('/time', (req, res)=>{
    setTimeout(()=>{
        res.send(new Date().toTimeString())
    }, 2000)
})
/**
 * On /date path we will pretend that there is an internal error, and make
 * the request fail in order to see how to handle errors in asynchronous 
 * request as well
 */
app.get('/date', (req, res)=>{
    setTimeout(()=>{
        res.destroy(new Error('Internal server error'))
    }, 2000)
})

app.listen(1337, ()=>console.log('Server running on 1337'))