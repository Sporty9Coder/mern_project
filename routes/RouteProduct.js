const express=require("express");
const app=express.Router();
const {doSaveProduct, doRemove, doUpdate, doFetch, showAll, doSaveProductGet}=require("../Controller/ControllerProduct");

app.post("/add-product",doSaveProduct);
app.post("/delete-product",doRemove);
app.post("/update-product",doUpdate);
app.post("/fetchOne-product",doFetch);
app.post("/fetchAll-product",showAll);
app.get("/add-product",doSaveProductGet);


module.exports=app;
