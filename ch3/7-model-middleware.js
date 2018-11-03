/**
 * Writing middleware functions for Mongoose - Model middleware functions
 * 
 * Middleware functions in Mongoose are also called hooks. There are four
 * types of hooks: document middleware, model middleware, aggregate middleware
 * and query middleware. All fo them are defined on the schema level. The
 * difference is, when the hooks are executed, the context of this refers 
 * to the document, model, aggregation object, or the query object
 * 
 * All types of middleware support pre and post hooks
 *
 * There's only one model instance method that supports hooks: insertMany
 * This validates an array of documents and svaes them in the database 
 * only if all the documents in the array passed validation. A model
 * middleware is also defined in the same way as query and documents
 * middlware functions are.
 */ 

const mongoose=require('mongoose')
const {connection, Schema}=mongoose
mongoose.connect('mongodb://127.0.0.1:27017/test').catch(console.error)

const UserSchema=new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

UserSchema.pre('insertMany', async function(){
    console.log('Preparing docs')
})

UserSchema.post('insertMany', async function(docs){
    console.log('The following docs were created:n', docs)
})

const User=mongoose.model('User', UserSchema)

connection.once('connected', async function(){
    try{
        await User.insertMany([
            {firstName: 'Leo', lastName: 'Smith'},
            {firstName: 'Neo', lastName: 'Jackson'}
        ])
    } catch(error){
        console.dir(error, {colors:true})
    } finally{
        connection.close()
    }
})