/**
 * VIRTUAL DOMAINS
 * 
 * Imagine that you ave two or more subdomains, and you want to
 * serve two different web applications. However, you don't
 * want to create a different web server application for each
 * subdomain. For that purpose, you can use vhost,  a configurable 
 * middleware function.
 * 
 * Building two mini applications using Router that will be served
 * in two different sub-domains:
 */

const express=require('express')
const vhost=require('vhost')
const morgan=require('morgan')
const app=express()

app.use(morgan('dev'))

const app1=express.Router()
const app2=express.Router()

app1.get('/', (request, response, next)=>{
    response.send('This is the main application')
})

app2.get('/', (request, response, next)=>{
    response.send('This is a second application.')
})

app.use(vhost('localhost', app1))
app.use(vhost('second.localhost', app2))

app.listen(1337, ()=>console.log('Server running on 1337'))
/**
 * Try the following URLs:
 * 1. http://localhost:1337/
 * 2. http://second.localhost:1337/
 */