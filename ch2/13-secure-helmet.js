/**
 * Securing an ExpressJS web application with Helmet
 * Helmet allows to protect web server applications against common attacks, such as 
 * cross-site-scripting (XSS), insecure requests, and clickjacking. Helmet is a 
 * collection of 12 middleware functions that allow you to set specific HTTP headers
 */

const express=require('express')
const helmet=require('helmet')
const bodyParser=require('body-parser')
const uuid=require('uuid')
const app=express()

/**
 * Generating a random ID which will be used for 'nonce' which is an HTML
 * attribute used for whitelist which scripts or styles are allowed to be
 * executed inline in the HTML code
 */

 const suid= uuid()

 /**
  * Using body parser to parse JSON request body for json and application/csp-report 
  * content types. application/csp-report is a content type that contains a JSON
  * request body which is sent by the browser when one or several CSP rules are violated
  */

  app.use(bodyParser.json({
      type: ['json', 'application/csp-report']
  }))