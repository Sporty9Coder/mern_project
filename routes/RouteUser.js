const express=require("express");
const app=express();
const {doSearch, doUpdate, doAdd, doSignUp, AddGrower, FetchGrower, UpdateGrower, doLogin,AvailProduct,doFetchItems,doDeleteItem,FetchCityConsumer,findGrower,fullDetails}=require("../Controller/ControllerUser");
const jwtAuth= require("../Auth/validateToken");
const jwtAuthNext=require("../Auth/validate-token-next");

app.post("/add-profile",doAdd);
app.get("/fetch-data",doSearch);
app.post("/update-user",doUpdate);
app.post("/signup",doSignUp);
app.post("/add-grower",AddGrower);
app.get("/fetch-growerdata",FetchGrower);
app.post("/update-grower",UpdateGrower);
app.post("/login",doLogin);



app.post("/avail-product",jwtAuthNext,AvailProduct);
app.get("/fetch-items",doFetchItems);
app.post("/delete-item",doDeleteItem);
app.get("/fetch-city",FetchCityConsumer);
app.post("/find-grower",findGrower);
app.get("/validate-token",jwtAuth);
app.get("/get-full-details",fullDetails);

module.exports=app;