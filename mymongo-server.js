const express=require("express");
const mongoose=require("mongoose");
const {dburl}=require("./Config/dbConfig");
const RouteProduct=require("./routes/RouteProduct");
const fileuploader=require("express-fileupload");
const bodyparser=require("body-parser");
const cors=require("cors");
const RouteUser=require("./routes/RouteUser");
const dotenv=require("dotenv");

dotenv.config();

const app=express();
app.use(fileuploader());
app.use(bodyparser.json());//for parsing POST data coming from Client
app.use(cors());

app.listen(1000,function(err)
{
    if(err==null)
    console.log("server Started at 1000");
else console.log(err);
})

const server=dburl;
mongoose.connect(server).then(()=>{
    console.log("congo");
}).catch((err)=>{
    console.log(err);
})

app.use(express.urlencoded(true));
app.use("/uploads", express.static("uploads"));
app.use("/product",RouteProduct);
app.use("/users",RouteUser);

/*app.post("/add-product",function(req,resp)
{
    console.log(req.body);
    const doc=new ProductModel(req.body)
    ;
    doc.save().then((retDoc)=>{
        resp.send(retDoc);
    })
})*/

app.post("/delete-item",function(req,resp)
{
    console.log(req.body);

    ProductModel.deleteOne({item:req.body.item}).then((result)=>{
        resp.send(result);
    }).catch((err)=>{
        resp.send(err);
    })
})

app.post("/all-item",function(req,resp)
{
    console.log(req.body);
    ProductModel.find().then((result)=>{
        resp.send(result)
    }).catch(()=>{
        resp.send({err:"error"});
    })
})

app.post("/one-item",function(req,resp)
{
    console.log(req.body);
    ProductModel.find({item:req.body.item}).then((result)=>{
        resp.send(result);
    }).catch(()=>{
        resp.send({err:"error"});
    })
})
