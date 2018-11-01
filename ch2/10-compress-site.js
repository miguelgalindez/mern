/**
 * compression is a middleware functions that compresses the response body
 * that will be send to the client. The Accept-Encoding HTTP header is
 * used to determine which content-encoding mechanism is supported on
 * the client-side (for example web browser). The Content-Encoding HTTP
 * header is used to tell the client which content encoding mechanism was
 * applied to the response body.
 */

 const express=require('express')
 const compression=require('compression')
 const app=express()
 
 /**
  * Including the compression middleware function and specifying the
  * level of compression to 9 (best compression) and threshold,
  * or minimum size in bytes that the response should have to
  * consider compressing the response body, to 0.
  * The threshold is set by default to 1KB which means that if the 
  * response size is below the number of bytes specified, then it
  * is not compressed. Set it to 0 or false to compress the response 
  * even when the size is below 1KB
  */
 app.use(compression({level: 9, threshold: 0}))

 /**
  * Defining a route method to handle GET request for path "/" which
  * will serve a sample HTML content that we expect to be compressed
  * and will print the encodings that the client accepts
  */
 app.get("/", (request, response, next)=>{
    response.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <title>WebApp powered by ExpressJS</title>
        </head>
        <body>
        <section role="application">
        <h1>Hello! this page is compressed!</h1>
        </section>
        </body>
        </html>     
     `)
    console.log(request.acceptsEncodings())
 })

app.listen(1337, ()=>console.log('Web server running on 1337'))