/**
 * Writing middleware functions for Mongoose - Query middleware functions
 * 
 * Middleware functions in Mongoose are also called hooks. There are four
 * types of hooks: document middleware, model middleware, aggregate middleware
 * and query middleware. All fo them are defined on the schema level. The
 * difference is, when the hooks are executed, the context of this refers 
 * to the document, model, aggregation object, or the query object
 * 
 * All types of middleware support pre and post hooks
 * 
 * Query middleware functions are defined exactly as document
 * middleware functions are. However, the context of this
 * doesn't refer to the document but instead to the query object
 */

 const mongoose=require('mongoose')
 const {connection, Schema}=mongoose 
 mongoose.connect('mongodb://127.0.0.1:27017/test').catch(console.error)

const UserSchema=new Schema({
    firstName: {type: String, required: true},
    lastNamme: {type: String, required: true}
})

UserSchema.pre('count', async function(){
    console.log(`Preparing to count document with this criteria: ${JSON.stringify(this._conditions)}`)
})

UserSchema.post('count', async function(count){
    console.log(`Counted ${count} documents that coincide`)
})

UserSchema.pre('find', async function(){
    console.log(`Preparing to find all documents with criteria ${JSON.stringify(this._conditions)}`)
})

UserSchema.post('find', async function(docs){
    console.log(`Found ${docs.length} documents`)
})

UserSchema.pre('findOne', async function(){
    console.log(`Preparing to find one document with criteria ${JSON.stringify(this._conditions)}`)
})

UserSchema.post('findOne', async function(doc){
    console.log(`Found 1 document ${JSON.stringify(doc)}`)
})

UserSchema.pre('update', async function(){
    console.log(`Preparing to update all documents with criteria ${JSON.stringify(this._conditions)}`)
})

UserSchema.post('update', async function(r){    
    console.log(`${JSON.stringify(r)} document(s) were updated`)
})

const User=mongoose.model('User', UserSchema)

connection.once('connected', async function(){
    try{
        const user=new User({
            firstName: 'John',
            lastNamme: 'Smith'
        })
        await user.save()
        await User
                .where('firstName').equals('John')
                .update({lastName: 'Anderson'})
        await User.findOne()
                .where('firstName').equals('John')
                .select(['lastName'])
        await User.find()
                .where('firstName').equals('John')
        await User
                .where('firstName').equals('Neo')
                .count()
        await user.remove()
    } catch(error){
        console.dir(error, {colors:true})
    } finally{
        await connection.close()
    }
})