const express=require('express')
const app=express()
const router=express.Router()

/**
 * Defining our middleware function for the router
*/ 
router.use((request, response, next)=>{
    console.log('URL: ', request.originalUrl)
    next()
})

router.get('/', (request, response, next)=>{    
    response.status(200).send('Hello world from Router Home')    
})

app.use('/router', router)

app.listen(1337, ()=> console.log('Web app running on port 1337'))
