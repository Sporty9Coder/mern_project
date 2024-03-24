var url=require("url"); // core module
var querystring=require("querystring"); // core module

var fullurl="http://realjavaonline.com:80/users/signup.html?uid=banglore&pwd=computer#hello";

var obj=url.parse(fullurl);
console.log(obj);
var qrystr=obj.query;
console.log(qrystr);

var objD=querystring.parse(qrystr);
// console.log(objD);
console.log(JSON.stringify(objD));
console.log("Welcome "+objD.uid);