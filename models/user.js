const mongoose=require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose')

const authSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    age:{
        type:Number,
        required:true,
        trim:true
    },
    phonenumber:{
        type:Number,
        required:true,
        trim:true
    },
    gender:{
        type:String,
        required:true,
        trim:true
    }

})

authSchema.plugin(passportLocalMongoose)

let User=mongoose.model("User",authSchema)
module.exports=User