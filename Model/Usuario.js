const {Schema,model} = require('mongoose')

const UsusuariSchema = Schema({
     email:{
        type:String,
     },
     numbers:{
          type:String
     },
     passwordone:{
          type:String,
         },
     passwordtwo:{
          type:String,
         },
     username:{
          type:String,
         },
     imgUrl:String,
})

UsusuariSchema.methods.setImgUrl= function setImgUrl (filename){
     const host = process.env.HOST
     const port = process.env.PORT
     this.imgUrl = `https://quilify.herokuapp.com/public/${filename}`
}

module.exports= model('Usuario',UsusuariSchema)

