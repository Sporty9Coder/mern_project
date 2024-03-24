var http=require("http");
var url=require("url");
var fs=require("fs");

var server=http.createServer(function(req,resp)
{
    resp.setHeader("Content-Type","text/html");
    var fullurl=req.url;
    var purl=url.parse(fullurl,true);
    // resp.write(purl.pathname);
    // resp.write(fullurl);
    // resp.write(JSON.stringify(purl.query)); // resp.write() only takes string or an instance of Buffer or Uint8Array as argument 
    console.log(purl);
    if(purl.pathname==="/Signup")
    {
        // resp.write("do signup here");
        fs.readFile(__dirname+"/public/signIn.html",(err,data)=>{
            if(!err)
            {
                // console.log(data);
                // console.log(data.toString());
                resp.write(data);
            }
            else {
                resp.write(err.message);
            }
        resp.end();
        })
    }
    else if(purl.pathname==="/login")
    {
        // resp.write("do login here");
        // resp.end();
        fs.readFile(__dirname+"/public/login.html",(err,data)=>{
            if(!err)
            {
                console.log(data);
                resp.write(data);
            }
            else {
                resp.write(err.message);
            }
            resp.end();
        })
    }
    // resp.end();
});

server.listen(6969,(err)=>
{
    if(!err)
    {
        console.log("server started");
    }
    else console.log(err.message);
})