/**
 * A common pattern for writing middleware functions is to wrap
 * the middleware function inside another function. The result
 * of doing so is a configurable middleware function. They are
 * also higher-order functions, that is, a function that returns 
 * another function.
 */

const logger = (options) => (request, response, next) => {
    if(typeof options === 'object' && options !== null && options.enable){
        console.log('Status code: ', response.statusCode,
                    'Url: ',request.originalUrl)
    }
    next()
}
module.exports=logger