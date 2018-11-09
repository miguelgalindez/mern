/**
 * USING EXPRESS JS MIDDLEWARE IN SOCKET.IO
 * 
 * Socket.io Object also contains a request and a response object
 * that we can use to store other properties.
 *
 *      namespace.use((socket, next) => {
            const req = socket.request
            const res = socket.request.res
            next()
        })

 * We can safely execute the same function in a socket.io namespace
 * middleware passing the necessary arguments
 * 
 *      root.use((socket, next) => {
            const req = socket.request
            const res = socket.request.res
            expressMiddleware(req, res, next)
        })
/**
 * However, that doesn't mean that all ExpressJS middleware functions will
 * work out of the box. If an expressJS middleware function uses methods
 * only available within ExpressJS, it may fail or have an unexpected behavior.
 * 
 * In the following code we are going to see how to integrate the ExpressJS
 * express-session middleware to share the session object between Soecket.io and ExpressJS
 */
const users=[
    {username: 'miguelgalindez', password: 'asd'},
    {username: 'munozyensy', password: 'zxc'},
    {username: 'mumer123', password: 'qwe'}    
]

const path=require('path')
const express=require('express')
const io=require('socket.io')()
const expressSession=require('express-session')
const app=express()
io.path('/socket.io')

const session=expressSession({
    secret: 'MERN Secret',
    resave: true,
    saveUninitialized: true,
})

app.use(session)

const namespace={
    home: io.of('/home'),
    login: io.of('/login')
}
/**
 * Defining a Socket.io namespace middleware that will use the
 * previously created session middleware to generate a session object
 */
const ioSessionBuilder=(socket, next)=>{
    session(socket.request, socket.request.res, next)
}

namespace.home.use(ioSessionBuilder)
namespace.home.use((socket, next)=>{
    const {session}=socket.request
    if(session.isLogged){
        next()
    }
})

namespace.home.on('connection', (socket)=>{
    console.log('Client connected to home')
    const {username} = socket.request.session
    socket.emit('welcome', `Welcome ${username}, you're logged in !`)
})

namespace.login.use(ioSessionBuilder)
namespace.login.on('connection', (socket)=>{
    console.log('Client connected to login')
    socket.on('enter', (data)=>{
        const {username, password}=data
        const found=users.find((user)=>(
            user.username===username && user.password===password
        ))
        if(found){
            const {session}=socket.request
            session.isLogged=true
            session.username=username
            session.save()
            socket.emit('loginSuccess')            
        } else{
            socket.emit('loginError', {message: 'Invalid credentials'})
        }
    })
})

app.get('/home', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '8-io-express-cli.html'))
})

io.attach(app.listen(1337, ()=> console.log('Server and Socket.io are running on port 1337')))