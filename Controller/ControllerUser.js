const { error } = require("console");
const {UserModel,signUpModel,growerModel,AvailProductModel}=require("../Models/modelUser");
const path=require("path");
const jwttoken=require("jsonwebtoken");

function doAdd(req,resp)
{
    console.log(req.body);
    var filename="nopic.jpg";
    if(req.files!=null)
    {
        filename=req.files.pic.name;
        var picpath=path.join(__dirname,"..","uploads",filename);
        req.files.pic.mv(picpath);
        console.log(picpath);
    }
    req.body.picname=filename;
    const doc=new UserModel(req.body);
    doc.save().then((retobj)=>{
        resp.json({status:true,res:retobj});
    }).catch((err)=>{
        resp.json({status:false,err:err.message,msg:"signing in again bastard"});
    })

}

function doSearch(req,resp)
{
    console.log(req.query.email);
    UserModel.findOne({email:req.query.email}).then((result)=>{
        if(result!=null)
        {
            console.log(result);
            resp.json({status:true,res:result});
            req.body.hdn=result.picname;
        }
    else resp.json({status:true,msg:"item not found"});
    }).catch((err)=>{
        resp.json({status:false,err});
    })
}

function doUpdate(req,resp)
{
    console.log(req.body);
    var filename;
    if(req.files!=null)
    {
        filename=req.files.pic.name;
        var picpath=path.join(__dirname,"..","uploads",filename);
        req.files.pic.mv(picpath);
    }
    else {
        filename=req.body.hdn;
    }
    req.body.picname=filename;
    const {name,email,country,gender,age,city,address,picname}=req.body;
    UserModel.findOneAndUpdate({email:email},{name:name,email:email,country:country,gender:gender,age:age,city:city,address:address,picname:picname},{new:true}).then((result)=>{
        resp.json({status:true,res:result});
    }).catch((err)=>{
        resp.json({status:false,err:err.message});
    })
}

function doSignUp(req,resp)
{
    console.log(req.body);
    const doc=new signUpModel(req.body);
    doc.save().then((retdoc)=>{
        resp.json({status:true,res:retdoc});
    }).catch((err)=>{
        resp.json({status:false,err:err.message});
    })
}

function AddGrower(req,resp)
{
    console.log(req.body);
    var filename="nopic.jpg";
    console.log(req.files);
    if(req.files!=null)
    {
        filename=req.files.aadharpic.name;
        var pic=path.join(__dirname,"..","uploads",filename);
        req.files.aadharpic.mv(pic);
        console.log(pic);
    }
    req.body.picpath=filename;
    const doc=new growerModel(req.body);
    doc.save().then((retobj)=>{
        resp.json({status:true,res:retobj});
    }).catch((err)=>{
        resp.json({status:false,err:err.message,msg:"signing in again bastard"});
    })

}

function UpdateGrower(req,resp)
{
    console.log(req.body);
    var filename;
    if(req.files!=null)
    {
        filename=req.files.aadharpic.name;
        var pic=path.join(__dirname,"..","uploads",filename);
        req.files.aadharpic.mv(pic);
    }
    else {
        filename=req.body.hdn;
    }
    req.body.picpath=filename;
    const {name,email,category,mobile,aadharno,city,address,picpath}=req.body;
    growerModel.findOneAndUpdate({email:email},{name:name,email:email,category:category,mobile:mobile,aadharno:aadharno,city:city,address:address,picpath:picpath},{new:true}).then((result)=>{
        resp.json({status:true,res:result});
    }).catch((err)=>{
        resp.json({status:false,err:err.message});
    })
}

function FetchGrower(req,resp)
{
    console.log(req.query.email);
    growerModel.findOne({email:req.query.email}).then((result)=>{
        if(result!=null)
        {
            console.log(result);
            resp.json({status:true,res:result});
            req.body.hdn=result.picpath;
        }
    else resp.json({status:true,msg:"item not found"});
    }).catch((err)=>{
        resp.json({status:false,err});
    })
}

function doLogin(req,resp)
{
    const {email,password}=req.body;
    signUpModel.findOne({emailid:email,password:password}).then((retDoc)=>{
        console.log(retDoc);
        if(retDoc!=null)
        {
            //creation of web token 

            let skey=process.env.SEC_KEY;
            let token=jwttoken.sign({retDoc},skey,{"expiresIn":"1hr"});

            resp.json({status:true,msg:retDoc.usertype,jtoken:token});
        }
        else {
            resp.json({status:true,msg:"Account not created"});
        }
    }).catch((err)=>{
        resp.json({status:false,err:err.message});
    })
}

async function AvailProduct(req,resp)
{

    console.log(req.body);
    
    const growerObj=await growerModel.find({email:req.body.email})

    console.log(growerObj[0]);

    req.body.city=growerObj[0].city;
    console.log(req.body);

    const doc=new AvailProductModel(req.body);
    doc.city=growerObj[0].city

    if(req.body.category==='0')
    {
        doc.category="Milk Product";
    }
    else if(req.body.category==='1')
    {
        doc.category="Fruits";
    }
    else doc.category="Vegetables"
    console.log(doc);

    
    await doc.save().then((retdoc)=>{
        resp.json({status:true,res:retdoc,city:growerObj[0].city})
    }).catch((err)=>{
        console.log(err);
        resp.json({status:false,err:err.message});
    })

    /*catch(err)
    {
        console.log('Error in AvailProduct:', err);
        resp.status(500).json({ status: false, error: 'Internal server error' });
    }*/
}

function doFetchItems(req,resp)
{
    console.log(req.query);
    AvailProductModel.find({email:req.query.email},{category:1,item:1}).then((retdoc)=>{
        console.log(retdoc);
        if(retdoc!=[])
        resp.json({status:1,res:retdoc})
    else resp.json({status:2,res:"wrong emailid"})
    }).catch((err)=>{
        resp.json({status:0,err:err.message})
    })

}

async function doDeleteItem(req,resp)
{
    console.log(req.body);
    const {objid,itemname}=req.body;
    try
    {
        var arryobj=await AvailProductModel.find({_id:objid});
        console.log(arryobj);
    }catch(err)
    {
        console.log(err);
        resp.json({status:false,error:err})
    }

    const newitemary=arryobj[0].item.filter((str)=>str!==itemname);
    console.log(newitemary);

    arryobj[0].item=newitemary;
    console.log(arryobj[0]);
    await arryobj[0].save().then((retdoc)=>{
        console.log(retdoc);
        resp.json({status:true,res:retdoc});
    }).catch((err)=>{
        console.log(err);
        resp.json({status:false,error:err.message})
    })


}

    function FetchCityConsumer(req,resp)
    {

        AvailProductModel.distinct("city").then((retdoc)=>{
            console.log(retdoc);
            resp.json({status:true,cities:retdoc});
        }).catch((err)=>{
            console.log(err);
            resp.json({status:false,error:err.message,msg:"error in query"})
        })

    }

async function findGrower(req,resp)
{
    console.log(req.body);
    const {category,item,city}=req.body;
    await AvailProductModel.find({$and:[{category:category},{item:{$in:[item]}},{city:city}]}).then((result)=>{
        console.log(result);
        resp.json({status:true,res:result});
    }).catch((err)=>{
        console.log(err);
        resp.json({status:false,error:err.message});
    })

    /*let growerary=[];

   await groweremail.map(async (obj)=>{
        await growerModel.findOne({email:obj.email}).then((res)=>{
            console.log(res);
            growerary=[...growerary,res];
            // resp.json(res);
        }).catch((err)=>{
            console.log(err);
            resp.json(err);
        })
        await console.log(growerary);
    
        await resp.json({status:true,ary:growerary});
    
    })  */
   
}

async function fullDetails(req,resp)
{
    console.log(req.query);
    await growerModel.findOne({email:req.query.email}).then((result)=>{
        console.log(result);
        resp.json({status:true,res:result});
    })
    .catch((err)=>{
        console.log(err);
        resp.json({status:false,error:err.message})
    })
}

module.exports={doAdd,doSearch,doUpdate,doSignUp,AddGrower,UpdateGrower,FetchGrower,doLogin,AvailProduct,doFetchItems,doDeleteItem,FetchCityConsumer,findGrower,fullDetails};