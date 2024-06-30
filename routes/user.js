const express=require("express")

const router=express.Router();

const {handeluserlogin,handelusersignup}=require("../controler/user")
router.post('/',handelusersignup)
router.post('/login',handeluserlogin)


module.exports=router;