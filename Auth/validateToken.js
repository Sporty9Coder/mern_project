const jwt =require("jsonwebtoken");

function jwtAuth(req,resp)
{
    
    const full_token=req.headers['authorization'];
    console.log(full_token);

    var ary=full_token.split(" ");

    let actualToken=ary[1];
    let isTokenValid;
    try
    {
    isTokenValid = jwt.verify(actualToken,process.env.SEC_KEY);
    }
    catch(err)
    {
        resp.json({status:false,message:"token expired"});
        return;
    }

    if(isTokenValid)
    {
        console.log("********////*******");

        const obj=jwt.decode(ary[1]);

        resp.json({status:true,item:obj,message:"***Authorized***"});
    }
    else {
        resp.json({status:false,message:"**unauthorized**"});
        return;
    }
}

module.exports=jwtAuth;