const {Schema,model} = require("mongoose")

const User = Schema({
    namecompany:{
        type:String
    },
    namecolaborador:{
       type:String,
    },
    lastname:{
         type:String
    },
    address:{
         type:String,
        },
    phone:{
         type:String,
        },
    email:{
         type:String,
        },
    password:{
        type:String
    },

})

module.exports= model('User',User)