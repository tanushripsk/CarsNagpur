const express = require('express')
const userSignUpController = require('../controller/userSignUp')
const userLoginController = require('../controller/userLogin')
const userLogout = require('../controller/userLogout')

// const router=express.Router()

const router = express.Router()



router.post("/signup",userSignUpController)
router.post("/login",userLoginController)
router.get("/userLogout",userLogout)


module.exports= router