/**
 * Defining static model methods
 * 
 * Static model methods are defined in the schema in the same way
 * as document instance methods are.
 * 
 * Schemas have a property called statics which is an object. All the meethods 
 * defined inside the statics object are passed to the model.
 */

const mongoose=require('mongoose')
const {connection, Schema}=mongoose

mongoose.connect('mongodb://localhost:27017/test').catch(console.error)

const UserSchema=new Schema({
    firstName: String,
    lastName: String,
    likes: [String]
})

UserSchema.static('getByFullName', function(v){
    const fullName = String(v).split(' ')
    const lastName = fullName[0] || ''
    const firstName = fullName[1] || ''
    return this.findOne()
        .where('firstName').equals(firstName)
        .where('lastName').equals(lastName)
})
/**
 * Static model methods can also be defined using the static
 * schema property. For instance:
 * 
 *      UserSchema.statics.getByFullName = function (v){
 *          // Do some stuff
 *      }
 */

UserSchema.statics.printUser=function(user){
    console.log(JSON.stringify(user, null, 4))
}

const User=mongoose.model('User', UserSchema)

connection.once('connected', async()=>{
    try{
        const user=new User({
            firstName: 'Jingxuan',
            lastName: 'Huang',
            likes: ['kitties', 'strawberries']
        })
        await user.save()

        const person=await User.getByFullName('Huang Jingxuan')
        User.printUser(person)

        await person.remove()
        await connection.close()
    } catch(error){
        console.log(error.message)
    }
})