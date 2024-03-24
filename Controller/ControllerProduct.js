const {getProductModel}=require("../Models/modelproduct");
const ProductModel=getProductModel();
const path=require("path");

function doSaveProduct(req,resp)
{
    resp.set("json");
    // console.log(req.body);
    var filename="nopic.jpg";
    // console.log(req.files);
    if(req.files!=null)
    {
        // console.log(req.files);
        filename=req.files.pic.name;
        // console.log(filename);
        var picpath=path.join(__dirname,"../","/uploads/",filename);
        console.log(picpath);
        req.files.pic.mv(picpath);
        req.body.picture=filename;
    }
    // console.log(req.body);
    const doc=new ProductModel(req.body);
    doc.save().then((retdoc)=>{
        console.log(retdoc);
        // resp.send(retdoc);
        resp.json({status:true,res:retdoc});
    }).catch((err)=>{
        resp.json({status:false,err:err.message,msg:"it's a duplicate entry you fool"});
    })
}

function doSaveProductGet(req,resp)
{
    resp.set("json");
    console.log(req.query);
    const doc=new ProductModel(req.query);
    doc.save().then((retDoc)=>{
        console.log(retDoc);
        resp.json({status:true,rec:retDoc});
    }).catch((err)=>{
        resp.json({status:false,err:err.message,msg:"it's a duplicate entry you fool"});
    })
}

function doRemove(req,resp)
{
    ProductModel.deleteOne({item:req.body.item}).then(function(result)
    {
        if(result.deletedCount>0)
        resp.json({status:true,msg:"item deleted"});
    else resp.json({status:true,msg:"invalid item"});
    }).catch(function()
    {
        resp.json({status:false,err:"error occured"});
    })
}

function doUpdate(req,resp)
{
    ProductModel.updateOne({item:req.body.item},{$set:{category:req.body.category,price:req.body.price,dop:req.body.dop}}).then((result)=>{
        if(result.matchedCount>0)
        {
            resp.json({status:true,msg:"updated"});
        }
        else resp.json({status:true,msg:"invalid item can't be updated"});
        // resp.json({result});
    }).catch((err)=>{
        resp.json({err});
    })
}

function doFetch(req,resp)
{
    ProductModel.findOne({item:req.body.item}).then((result)=>{
        if(result!=null)
        resp.json(result);
    else resp.json({msg:"item not found"});
    }).catch((err)=>{
        resp.json(err);
    })
}

function showAll(req,resp)
{
    ProductModel.find().then((resultJSON)=>{
        resp.json({resultJSON});
    }).catch((err)=>{
        resp.json(err);
    })
}

module.exports={doSaveProduct,doRemove,doUpdate,doFetch,showAll,doSaveProductGet};