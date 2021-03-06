/**
 * Using template engines
 * 
 * Template engines allow you to generate HTML code in a more
 * convenient way. Templates or views can be written in any
 * format, interpreted by a template engine that will replace
 * variables with other values, and finally transform to HTML.
 */

const express=require('express')
const fs=require('fs')
const app=express()

app.engine('tpl', (filepath, options, callback)=>{
    fs.readFile(filepath, (err, data)=>{
        if(err){
            return callback(err)
        }
        const content=data.toString().replace(/%[a-z]+%/gi,(match)=>{
            const variable=match.replace(/%/g, '')
            if(Reflect.has(options, variable)){
                return options[variable]
            }
            return match;
        })
        return callback(null, content)
    })
})

app.set('views', './views')
app.set('view engine', 'tpl')

app.get('/', (request, response, next)=>{
    response.render('home', {
        title: 'Hello',
        description: 'World!'
    })
})

app.listen(1337, ()=>console.log('Server running on 1337'))