const express=require("express");

const route=express.Router();

route.get("/signup",(req,resp)=>{
    console.log("signup");
    resp.send("signup");
})

route.get("/login",(req,resp)=>{
    console.log("login");
    resp.send("login");
})

module.exports=route;