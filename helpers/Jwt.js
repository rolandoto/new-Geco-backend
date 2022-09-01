const jwt  = require('jsonwebtoken')

const GeneratJTW =(uid,name) =>{

    return new Promise((resolve,reject) =>{
       
        const  payload  ={uid,name}

       jwt.sign(payload,process.env.SECRETE_JWT_SEED,{
           expiresIn:"9h"
       },(error,token) =>{
           if(error){
            console.log(error)
            reject('no se pudo generar el token')
           }
           resolve(token)
       })
    })
}

module.exports ={GeneratJTW}