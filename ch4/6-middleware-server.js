/**
 * Socket.io allows us to define two kinds of middleware functions in the server side:
 * 
 * 1. Namespace middleware: registers a function that gets executed for every new connected socket
 *          namespace.use((socket, next) => { ... })
 * 
 * 2. Socket middleware: registers a function that gets executed for every incoming packet
 *          socket.use((packet, next) => { ... })
 * 
 * We can add new properties to the socket or packet objects. If 'next' is not called, then the
 * socket won't be connected, or the packet received
 */

const express=require('express')
const app=express()
const server=require('http').Server(app)
const path=require('path')

const io=require('socket.io')(server)
io.path('/socket.io')
const root=io.of('/')

const users=[
    {username: 'miguelgalindez', password: 'asd'},
    {username: 'munozyensy', password: 'zxc'},
    {username: 'mumer123', password: 'qwe'}    
]

const userMatch=(username, password)=>(
    users.find(user => (
        user.username===username && user.password===password
    ))
)

const isUserLoggedIn=(socket, next)=>{
    const {session}=socket.request
    if(session && session.isLogged){
        /**
         * The socket is connected only if the client is logged in
         */
        next()
    }
}

const namespace = {
    home: io.of('/home').use(isUserLoggedIn),
    login: io.of('/login')
}

namespace.login.on('connection', socket =>{
    socket.use((packet, next)=>{        
        const [eventName, user] = packet
        if(eventName === 'tryLogin' && user.username ==='mumer123'){
            socket.emit('loginError', { message: 'Banned user!'})
        }else{
            next()
        }
    })

    socket.on('tryLogin', (user)=>{
        const {request}=socket
        if(userMatch(user.username, user.password)){
            request.session={
                isLogged: true,
                userusername: user.username
            }
            socket.emit('loginSuccess')
        }else{
            socket.emit('loginError', { message: 'invalid credentials'})
        }        
    })
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '6-middleware-cli.html'))
})

server.listen(1337, ()=>console.log('Server and Socket.io running on 1337'))
