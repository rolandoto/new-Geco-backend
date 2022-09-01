const {Router} = require('express')
const {check} = require('express-validator')
const { LoginUsuario, createRegister, uploadImage, GetProduct, ValidTokenUser, UpdatePassword } = require('../Controller/ControllerUser')
const { upload } = require('../lib/Storage')
const { ValidarCampos } = require('../middleweres/middleaweares')

const router = Router()

router.post('/login',
    [
        check('numbers','el numbers es obligatorio').isLength({min:9}),
        check('passwordone','el passwordone es obligatorio').isLength({min:6}),
        ValidarCampos
    ],

LoginUsuario)

router.post('/register',
    [
        check('email','el email  es obligatorio').isEmail(),
        check('numbers','el numero es obligatorio').isLength({min:9}),
        check('passwordone','el passwordone es obligatorio').isLength({min:6}),
        check('passwordtwo','el passwordtwo es obligatorio').isLength({min:6}),
        ValidarCampos
    ],
    createRegister
)

router.post('/product',upload.single("image"),uploadImage)

router.get('/product' ,GetProduct)

router.post("/validpassword", [
        check('numbers','el numero  es obligatorio').isLength({min:9}),
        ValidarCampos
        ],
    ValidTokenUser
)

router.post("/updatepassword", 
     [
        check('passwordone','el passwordone es obligatorio').isLength({min:6}),
        check('passwordtwo','el passwordtwo es obligatorio').isLength({min:6}),
        ValidarCampos
     ],
      UpdatePassword
)

//+19107824959
module.exports={router}