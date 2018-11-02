/**
 * Writing middleware functions for Mongoose
 * 
 * Middleware functions in Mongoose are also called hooks. There are four
 * types of hooks: document middleware, model middleware, aggregate middleware
 * and query middleware. All fo them are defined on the schema level. The
 * difference is, when the hooks are executed, the context of this refers 
 * to the document, model, aggregation object, or the query object
 * 
 * All types of middleware support pre and post hooks
 * 
 * In document middleware functions, the context of this refers to the
 * document. A document has the following built-in methods and you can 
 * define hooks for them:
 *      init
 *      validate
 *      save
 *      remove
 */
const mongoose=require('mongoose')
const {connection, Schema}=mongoose

mongoose.connect('mongodb://localhost:27017/test').catch(console.error)

const UserSchema=new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

UserSchema.pre('init', async function preinit(){
    console.log('A document is going to be initialized')
})

UserSchema.post('init', async function postInit(){
    console.log('A document was initialized')
})

UserSchema.pre('validate', async function preValidate(){
    console.log('A document is going to be validated')
})

UserSchema.post('validate', async function postValidate(){
    console.log('All validations rules were executed')
})

UserSchema.pre('save', async function(){
    console.log('Preparing to save the document')
})

UserSchema.post('save', async function(){
    console.log(`A doc was saved ${this.id}`)
})

UserSchema.pre('remove', async function(){
    console.log(`Doc with id=${this.id} will be removed`)
})

UserSchema.post('remove', async function(){
    console.log(`Doc with id=${this.id} was removed`)
})

const User=mongoose.model('User', UserSchema)
connection.once('connected', async function(){
    try{
        const user= new User({
            firstName: 'John',
            lastName: 'Smith'
        })
        await user.save()
        await User.findById(user.id)
        await user.remove()        
    } catch(error){
        console.dir(error.message, {colors: true})
    } finally{
        await connection.close()
    }
})