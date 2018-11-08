/**
 * WORKING WITH SOCKET.IO NAMESPACES
 * 
 * Namespaces are a way of separating the business logic of your application
 * while reusing the same TCP connection or minimizing the need of creating
 * new TCP connections for to implement real time communication between the
 * server and the client.
 * 
 * Namespaces look pretty similar to ExpressJS route paths: 
 *      /home
 *      /users/profile
 * However, as mentioned in previous recipes, these are not related to URLs.
 * By default, a single TCP connection is created at this URL:
 *      http[s]://host:port/socket.io
 */

const app=require('express')()
const io=require('socket.io')()
const path=require('path')

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '4-nsp-client.html'))
})

io.path('/socket.io')

io.of('/en').on('connection', socket=>{
    socket.on('getData', ()=>{
        socket.emit('data', {
            title: 'English page',
            msg: 'Welcome to my website'
        })
    })
})

io.of('/es').on('connection', socket=>{
    socket.on('getData', ()=>{
        socket.emit('data', {
            title: 'Página en español',
            msg: 'Bienvenido a mi sitio web'
        })
    })
})
io.listen(1338, ()=>'Socket.io Listening')
app.listen(1337, ()=>{
    console.log('Server running on port 1337')
})