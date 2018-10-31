const express=require('express');
const app=express();

app.get('/', (request, response, next) =>{
    response.status(200).send('Hello from Express JS')
})

app.get('/one', (request, response, next) => {
    response.type('text/plain')
    response.write('Hello ')
    next()
})

app.get('/one', (request, response, next)=>{
    response.status(200).end('World!')
})

app.get('/two', (request, response, next)=>{
    response.type('text/plain')
    response.write('Hello ')
    next()
})

app.get('/two', (request, response, next)=>{
    response.status(200).end('Moon!')
})

app.route('/home')
    .get((request, response, next)=>{
        response.type('text/html')
        response.write('<!DOCTYPE html>')
        next()
    })
    .get((request, response, next)=>{
        response.end(`
            <html lang="en">
            <head>
            <meta charset="utf-8">
            <title>WebApp powered by ExpressJS</title>
            </head>
            <body role="application">
                <form method="post" action="/home">
                    <input type="text" />
                    <button type="submit">Send</button>
                </form>
            </body>
            </html>
        `)
    })
    .post((request, response, next)=>{
        response.send('Got it')
    })
    
    app.get(/([a-z]+)-([0-9]+)$/, (request, response, next)=>{
        response.type('text/plain')
        response.write("RegExp: "+JSON.stringify(request.params))
        next()
    })
    

    app.get('/:id-:tag', (request, response, next)=>{
        response.write("\nLinked Parameters: "+JSON.stringify(request.params))
        response.send()
    })

app.listen(1337, () => console.log('Web server running on port 1337'))