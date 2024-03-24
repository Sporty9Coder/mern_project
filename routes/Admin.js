const express=require("express");
const path=require("path");

const route=express.Router();

route.get("/",(req,resp)=>{
    const pathh=path.join(__dirname,"../","/public/Admin-dash.html");
    console.log(pathh);
    resp.sendFile(pathh);
})

route.get("/allusers",(req,resp)=>{
    console.log("all users");
    resp.send("all users");
})

route.get("/block",(req,resp)=>{
    console.log("blocked");
    resp.send("User blocked");
})

module.exports=route;