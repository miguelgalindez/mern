const mongoose=require('mongoose')
const options={
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 3000,
    keepAlive: true    
}
/**
 * Compiling the mongoose schemas into models
 */
require('./api/model')

/**
 * Trying to connect to Mongo
 */
mongoose.connect('mongodb://localhost:27017/test', options)
    .then(() => console.log('Mongoose connected'))
    .catch(console.error);

/**
 * Adding connection event handlers
 */
mongoose.connection.on('reconnected', function(){
    console.log('Mongoose reconnected')
})

mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error ', err)
})

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconnected')
})

/**
 * Exporting the Mongoose connection
 */
module.exports=mongoose.connection;

/**
 * Adding some application finishing event handlers
 */
const shutdown=function(msg, callback){
    mongoose.connection.close(function(){
        console.log('Mongoose disconnected through: ', msg)
        callback()
    })
}

process.once('SIGUSR2', function(){
    shutdown('Nodemon restart', function(){
        process.kill(process.pid, 'SIGUSR2');
    })
})

process.on('SIGINT', function(){
    shutdown('App termination', function(){
        process.exit(0); 
    })
})

process.on('SIGTERM', function(){
    shutdown('Heroku app shutdown', function(){
        process.exit(0);
    })
})