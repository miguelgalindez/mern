const path=require('path')
const express=require('express')
const io=require('socket.io')()
const app=express()

io.path('/socket.io')
io.of('/').on('connection', socket=>{
    socket.emit('welcome', 'Hello from my server')
})

app.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '7-io-express-view.html'))
})

io.attach(app.listen(1337, ()=>console.log('HTTP server and Socket.io running on port 1337')))

/**
 * Even though this preceding example won't actually brak your application, make sure 
 * to never use the same URL path to serve content from ExpressJS and accept new
 * connections for Socket.io at the same time.
 * 
        const express = require('express')
        const io = require('socket.io')()
        const app = express()
        io.path('/socket.io')
        app.get('/socket.io', (req, res) => {
            res.status(200).send('Hey there!')
        })
        io.of('/').on('connection', socket => {
            socket.emit('someEvent', 'Data from Server!')
        })
        io.attach(app.listen(1337))
/**
 * Socket.io server serves, by default, its own Socket.io Client under the following URL:
        
        http://localhost:1337/socket.io/socket.io.js
        
 * If you wish to serve your own version of Socket.io client or if it is included
 * in the bundle of your application, you can disable the default behavior in
 * your Socket.io server application with the serveClient method:
 *      io.serveClient(false)
 */