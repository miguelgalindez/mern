const io=require('socket.io')()
// Define the URL path where connections will be made
io.path('/socket.io')
// Use the root or '/' namespace
const root=io.of('/')

root.on('connection', socket => {
    let counter=0
    socket.on('time', ()=>{
        const currentTime=new Date().toTimeString()
        counter++
        socket.emit('got time?', currentTime, counter)
    })
})

io.listen(1337)