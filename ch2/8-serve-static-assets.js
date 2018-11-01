/**
 * Using expressJS' built-in middleware function for serving static assets
 */

const express=require('express')
const path=require('path')
const app=express()

const publicDir=path.join(__dirname, './public')
const secondPublicDir=path.join(__dirname, './another-public')
/**
 * Two different files in different locations were served under
 * one path
 */
app.use('/', express.static(publicDir), express.static(secondPublicDir))

app.listen(1337, ()=>console.log('Server running on port 1337'))