const {response} = require("express")
const user = require("../Model/Usuario")

const userRegister =async(req,res=response) =>{

    const {email} =req.body

        try {   

            const Email = await user.findOne({email})

            if(Email){
                return res.status(401).json({
                    ok:false,
                    msg:"elija otro email"
                })
            }

            let register =  user(req.body)

            const result = await register.save()
            
            res.status(201).json({
                ok:true,
                result
            })
            
        } catch (error) {
            res.status(201).json({
                ok:false,
            })
        }
}

const userLogin =async(req,res=response) =>{

    const {email,password} = req.body

    try {   

        const Islogin =  await user.findOne({email})

        if(!Islogin){
            return res.status(401).json({
                ok:false,
                msg:"correo no retgistrado"
            })
        }

        const passs = await user.findOne({password})

        if(!passs){
            return res.status(201).json({
                ok:true,
                msg:"passowrd incorrecta"
            })
        }

        res.status(201).json({
            ok:true,
            token:1223213,
            result:Islogin
        })
        
    } catch (error) {
        
    }
}

module.exports={
                userRegister,
                userLogin,}