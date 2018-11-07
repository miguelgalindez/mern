const mongoose=require('mongoose')
const {connection, Schema}=mongoose
const crypto=require('crypto')

const UserSchema=new Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 20,
        required: [true, 'username field is required'],
        validate: {
            validator: function(value){
                return /^[a-zA-Z]+$/.test(value)
            },
            message: '{VALUE} is not a valid username'
        }
    },
    password: String
})

UserSchema.statics.login=async function(usr, pwd){
    const hash=await crypto.createHash('sha256').update(String(pwd))
    const user=await this.findOne().where('username').equals(usr)
                                    .where('password').equals(hash.digest('hex'))
    if(!user) throw new Error('Incorrect credentials')
    delete user.password
    return user
}

UserSchema.statics.signup=async function(usr, pwd){    
    if(pwd.length<6){
        throw new Error('Pwd must have more than 6 chars')
    }

    const hash=await crypto.createHash('sha256').update(pwd)
    const exists=await this.findOne().where('username').equals('usr')
    if(exists) throw new Error('Username already exists')
    
    const user=await this.create({
        username: usr,
        password: hash.digest('hex')
    })    
    return user;
}

UserSchema.methods.changePass=async function(pwd){
    if(pwd.length<6){
        throw new Error('Pwd must have more than 6 chars')
    }
    const hash=crypto.createHash('sha256').update(pwd)
    this.password=hash.digest('hex')
    return this.save()
}

/** 
 * Compiling the mongoose schema into a model
 */
mongoose.model('User', UserSchema)