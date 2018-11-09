/**
 * DEFINING AND JOINING SOCKET.IO ROOMS
 * 
 * Within namespaces you can define rooms (or channels) that a socket can
 * join or leave. By default, a room is created with a random un-guessable
 * ID for the connected socket:
 * 
 *      io.on('connection', (socket)=>{
 *          socket.emit('say', 'hello')
 *      })
 * 
 * What happens underneath is similar to this:
 * 
 *      io.on('connection', (socket)=>{
 *          socket.join(socket.id, (error)=>{
 *              if(err){
 *                  return socket.emit('error', err)
 *              }
 *              io.to(socket.id).emit('say', 'hello')              
 *          })
 *      })
 * 
 * Because a socket ID represents a unique connection with a client and, by
 * default, a room with the same ID is created; all data sent by the server 
 * to that room will be received only by that client. However, if several
 * clients or socket IDs join a room with the same name and the server sends
 * data; all clients could be able to receive it
 */

const express=require('express')
const app=express()
const path=require('path')
const server=require('http').Server(app)
const io=require('socket.io')(server)
io.path('/socket.io')
const root=io.of('/')

/**
 * Defining a method that will be used to emit an event to all socket clients
 * connected to the 'commonRoom'
 */
const notifyClients=()=>{
    root.clients((err, clients)=>{
        if(err) throw error
        root.to('commonRoom').emit('updateClientCount', clients.length)
        /**
         * If we had used the following code instead of the preceding one, the
         * message would have been sent to all clients in commonRoom EXCEPT to
         * the sender (or the socket that originated the request):
         * 
         *  socket.to('commonRoom').emit('updateClientCount', data)
         */
    })
}

root.on('connection', socket=>{
    socket.join('commonRoom')
    socket.emit('welcome', `Welcome client: ${socket.id}`)
    socket.on('disconnect', notifyClients)
    notifyClients()
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '5-rooms-client.html'))
})

server.listen(1337, ()=>console.log('Server running on 1337'))