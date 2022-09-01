const {response} = require('express')
const usuario = require('../Model/Usuario')
const bcryptjs = require('bcryptjs')
const {GeneratJTW} = require('../helpers/Jwt')
const btoa = require('btoa')
const fetch = require("node-fetch")

const LoginUsuario =async(req,res=response) =>{

    const {numbers,passwordone} = req.body
    
    try {
        
        const isLogin  = await usuario.findOne({numbers})
        
        if(!isLogin){
            return res.status(401).json({
                ok:false,
                msg:"el usuario no esta registrado"
            })
        }
        
        const validPassword = bcryptjs.compareSync(passwordone,isLogin.passwordone)
        
        if(!validPassword){
            return res.status(401).json({
                ok:false,
                msg:"password incorrecto"
            })
        }

        const token = await GeneratJTW(isLogin.id,isLogin.email)

        return res.status(201).json({
            ok:true,
            token:token
        })

    } catch (error) {
        res.status(401).json({
            ok:false
        })
    }
}

const createRegister =async(req,res=response) =>{
    
    const accountiD = process.env.ACCOUNT_SID
    const authToken = process.env.AUTH_TOKEN

    const {email,numbers,passwordone,passwordtwo} = req.body
    
    try {
    
    const Email = await usuario.findOne({email})
    
    if(Email){
       return res.status(401).json({
            ok:false,
            msg:"elija otro correo este ya esta disponible"
        })
    }

    const Numbers = await usuario.findOne({numbers})

    if(Numbers){
        return res.status(401).json({
             ok:false,
             msg:"elija otro numero este ya esta disponible "
         })
     }

     if(passwordone !== passwordtwo){
         return  res.status(401).json({
             ok:false,
             msg:"no coninciden la contraseña"
         })
     }
    
    let register =   usuario(req.body)
    
    let salt = bcryptjs.genSaltSync()
    register.passwordone = bcryptjs.hashSync(passwordone,salt)
    register.passwordtwo = bcryptjs.hashSync(passwordtwo,salt)
    
    const token  = await GeneratJTW(register.id,register.email)
    const result  =await register.save()
   
    const user = "APIColombiared"
    const password ="Colombiared100%"
    
    const total =  btoa(`${user}:${password}`)
    const url = await 'http://api.messaging-service.com/sms/1/text/single';
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                "Authorization":`Basic ${total}`
                },
                body: JSON.stringify({ to:`57${numbers}`,
                text: `tu codigo  315455 `, 
                from: `57${numbers}`})
        };

    await fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));

    
     res.status(201).json({
            ok:true,
            result:result,
            token:token
        })
    
    } catch (error) {
        res.status(401).json({
            ok:false
        })
    }
}


const uploadImage = async(req, res, next) =>{

    
    const {email,name} = req.body

    try {

        let product = new usuario({name})
    
        const findName  = await usuario.findOne({name})

        if(findName){
            return res.status(401).json({
                ok:false,
                msg:"elija otros nombre por favor"
            })
        }
       

        //rolando
        const {filename} = req.file
        
        product.setImgUrl(filename)

        //usuario.setImgUrl(filename)
        
        const to = await  product.save()

        return  res.status(201).json({
             ok:true,
             results:to
        })
    } catch (error) {
        res.status(401).json({
            ok:false
        })
    }
}

const GetProduct = async(req,res=response) =>{

    try {
        const product = await usuario.find()

        return res.status(201).json({
            ok:true,
            product
        })
    } catch (error) {
        return res.status(401).json({
            ok:false
        })
    }
}

const ValidTokenUser =async(req,res=response) =>{

    const {numbers}  = req.body
    
    try {
        const isLogin  = await usuario.findOne({numbers})

        if(!isLogin){
            return res.status(401).json({
                ok:false,
                msg:"el numero no esta registrado con este usuario"
            })
        }       
    var val = Math.floor(1000 + Math.random() * 9000);

    const user = "APIColombiared"
    const password ="Colombiared100%"
    
    const total =  btoa(`${user}:${password}`)
    const url = await 'http://api.messaging-service.com/sms/1/text/single';
            const options = {
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                "Authorization":`Basic ${total}`
                },
                body: JSON.stringify({ to:`573202720874`,
                text: `tu codigo  ${val} `, 
                from: `573202720874`})
        };
        
        await fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))
        .catch(err => console.error('error:' + err));

        const token = await GeneratJTW(isLogin.id,isLogin.email)

        res.status(201).json({
            ok:true,
            token:token,
            code:val
        })
    } catch (error) {
        res.status(401).json({
            ok:false
        })
    }
}

const UpdatePassword  =async(req,res=response) =>{

    const {numbers,passwordone,passwordtwo} = req.body
    
    try {
        
        const IsLogin = await usuario.findOne({passwordone})

        if(!IsLogin){
            return res.status(201).json({
                ok:false,
                msg:"no coninciden el numero de celular"
            })
        }
    
        if(passwordone !== passwordtwo){
            return res.status(401).json({
                ok:false,
                msg:"no coinciden las password"
            })
        }
    
    const {id} = IsLogin
    
    let salt = bcryptjs.genSaltSync()
    const one = bcryptjs.hashSync(passwordone,salt)
    const two = bcryptjs.hashSync(passwordtwo,salt)

    const t={
        passwordone:one,
        passwordtwo:two
    }
    
    await usuario.findByIdAndUpdate(
        id,
        {
          $set: t,
        },
        { new: true }
      );
        
        res.status(201).json({
            ok:true,
            msg:"passsword update"
        })

    } catch (error) {
        
        res.status(401).json({
            ok:false,
        })
    }
}
module.exports ={LoginUsuario,createRegister,uploadImage,GetProduct,ValidTokenUser,UpdatePassword}
