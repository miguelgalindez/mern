/**
 * it's possible to pass control back to the next middleware function
 * or route method OUTSIDE of a routerby calling next('router)
 * 
 * The next('router') function can be used to get out of the router
 * or pass control to the next middleware function OUTSIDE the router
 */

const express=require('express')
const app=express()

/**********************************************************************
 *  Router definition 
 **********************************************************************/
const router=express.Router()

router.use((request, response, next)=>{
    if(!request.query.id){
        next('router') // Next, OUTSIDE of router
    }
    else{
        next() // Next, in router
    }
})

router.get('/', (request, response, next)=>{
    response.send(`You specified a user ID => ${request.query.id}`)
})
/**********************************************************************
**********************************************************************/

app.get('/', router, (request, response, next)=>{
    response.status(400).send('A user ID needs to be specified')
})
/**
 * In the preceding code, it's defined multiple inline handlers for 
 * the same route. That's the same as:
 *  app.get('/', router)
    app.get('/', (request, response, next)=>{
        response.status(400).send('A user ID needs to be specified')
    })
 */

app.listen(1337, ()=> console.log('Web server running on port 1337'))