/**
 * body-parser is a middleware function that parses the incoming
 * request body and makes it available in the request object.
 * 
 * The module supports automatic decompression of gzip and 
 * deflates encodings when the incoming request is compressed
 * 
 * The next code will dsiplay two forms to the user, both of
 * them will send data to our web server application encoded
 * in two different ways.
 */
const express=require('express')
const bodyParser=require('body-parser')
const app=express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.text())

app.get('/', (request, response, next) =>{
    response.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <title>WebApp powered by ExpressJS</title>
        </head>
        <body>
        <div role="application">
        <form method="post" action="/setdata">
        <input name="urlencoded" type="text" />
        <button type="submit">Send</button>
        </form>
        <form method="post" action="/setdata"
        enctype="text/plain">
        <input name="txtencoded" type="text" />
        <button type="submit">Send</button>
        </form>
        </div>
        </body>
        </html>    
    `)    
})

app.post('/setdata', (request, response, next)=>{
    console.log(request.body)
    response.end()
})
/**
 * The terminal outputs something like:
 *      { 'urlencoded': 'Example' }
 *      txtencoded=Example
 * 
 * 1. The first one bodyParser.urlencoded() parses incoming request for multipart/form-data
 *      encoding type. The result is available as an Object in request.body
 * 2. The second one bodyParser.text() parses incoming requests for text/plain encoding
 *      type. The result is available as a String in request.body
 */

app.listen(1337, ()=>console.log('Server running on port 1337'))