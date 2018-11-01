/**
 * Using expressJS' built-in middleware function for serving static assets.
 * The following code is equivalent to 8-serve-static-assets.js, but it
 * follows the router approach
 */

const express=require('express')
const path=require('path')
const app=express()
const router=express.Router()

const assets ={
    first: path.join(__dirname, './public'),
    second: path.join(__dirname, './another-public')
}
/**
 * Two different files in different locations were served under one path.
 * If two or more files with the same name exist under different directories,
 * only the first one found will be displayed on the client-side. That is
 * because only the first registered handler reply the request because it 
 * doesn't call the next handler.
 */
router.use(express.static(assets.first)).use(express.static(assets.second))
/**
 * The previous code is the same as the following (registering multiple inline handlers)
 *      router.use(express.static(assets.first), express.static(assets.second))
 */

app.use('/', router)

app.listen(1337, ()=>console.log('Server running on port 1337'))