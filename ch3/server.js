const mongoose=require('mongoose')
const express=require('express')
const session=require('express-session')
const bodyParser=require('body-parser')
const MongoStore=require('connect-mongo')(session)
const app=express()
const db=require('./db')
const api=require('./api/controller')

app.use(bodyParser.json())

app.use(session({
    secret: 'MERN Cookbook Secrets',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
        collection: 'sessions',
        mongooseConnection: mongoose.connection
    })
}))

app.use('/users', api)

db.once('connected', function(){
    app.listen(1337, ()=>console.log('Running on port 1337'))
})
