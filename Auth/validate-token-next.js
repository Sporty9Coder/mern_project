const jwt =require("jsonwebtoken");

function jwtAuthNext(req,resp,next)
{
    let isTokenValid;
    
    const full_token=req.headers['authorization'];
    console.log(full_token);

    var ary=full_token.split(" ");

    let actualToken=ary[1];
    try
    {
    isTokenValid = jwt.verify(actualToken,process.env.SEC_KEY);
    }
    catch(err)
    {
        console.log(err);
        resp.json({status:false,message:"token expired"});
        return;
    }

    if(isTokenValid)
    {
        console.log("********////*******");

        const obj=jwt.decode(ary[1]);
        console.log(obj);

        // req.body=obj.retDoc;
        next();
    }
    else {
        resp.json({status:false,message:"**unauthorized**"});
        return;
    }
}

module.exports=jwtAuthNext;