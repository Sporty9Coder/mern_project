const express=require("express");
const users=require("./routes/Users");
const admin=require("./routes/Admin");

var app=express();

app.listen(5000,function(err)
{
    if(err==null)
    {
        console.log("routing server started");
    }
    else {
        console.log(err);
    }
})

app.use("/user",users);
app.use("/admin",admin);
