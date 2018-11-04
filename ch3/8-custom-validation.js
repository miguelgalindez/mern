const mongoose=require('mongoose')
const {connection, Schema}=mongoose
mongoose.connect('mongodb://127.0.0.1:27017/test').catch(console.error)

const UserSchema=new Schema({
    userName:{
        type:String,
        minlength: 6,
        maxlength: 20,
        required: [true, 'user is required'],
        validate:{
            message: `{VALUE} is not a valid username`,
            validator: (val)=>/[a-zA-Z]+$/.test(val)
        }
    }
})

const User=mongoose.model('User', UserSchema)

connection.once('connected', async function(){
    try{
        const user=new User()
        let errors=null
        errors=user.validateSync()
        console.dir(errors.errors['userName'].message)
        user.userName='Smith'
        errors=user.validateSync()
        console.dir(errors.errors['userName'].message)
        user.userName='Smith_9876'
        errors=user.validateSync()
        console.dir(errors.errors['userName'].message)
    } catch(error){
        console.dir(error, {colors:true})
    } finally{
        await connection.close()
    }
})