/**
 * Every Mongoose model has static helper methods to do several kinds of
 * operations, such as retrieving a document. when there's no defined callback,
 * a query builder interface is returned, which can be later executed: 

    const user = User.findOne({
        firstName: 'Jonh',
        age: { $lte: 30 },
    })
    user.exec((error, document) => {
        if (error) return console.log(error)
        console.log(document)
    })

 * Queries also have a .then function which can be used as a Promise.
 * This allows us to use async/wait as well.
 * 
 * There are two ways that we can make a query. One is by providing a JSON object
 * that is used as a condition and the other way allows you to create a query using
 * chaining syntax.
 *  
 * try {
        const user = await User.findOne()
            .where('firstName', 'John')
            .where('age').lte(30)
        console.log(user)
    }
    catch (error) {
        console.log(error)
    }
 */
const mongoose=require('mongoose')
const {connection, Schema}=mongoose
mongoose.connect('mongodb://localhost:27017/test').catch(console.error)

/** Defining a schema */
const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number
})

/** Compiling the schema into a model */
const User=mongoose.model('User', UserSchema)

connection.once('connected', async()=>{
    try{
        const user=await new User({
            firstName: 'John',
            lastName: 'Snow',
            age:30
        }).save()

        const findUser=await User.findOne()
            .where('firstName').equals('John')
            .where('age').lte(30)
            .select('lastName age')
        console.log(JSON.stringify(findUser, null, 4))
        
        await user.remove()
    } catch(error){
        console.dir(error.message, {colors: true})
    } finally{
        await connection.close()
    }
})