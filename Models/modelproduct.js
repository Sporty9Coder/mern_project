const mongoose=require("mongoose");

function getProductModel()
{
    let Product=new mongoose.Schema(
        {
            item:{type:String,unique:true,index:true},
            category:String,
            dop:{type:Date},
            price:Number,
            picture:{type:String}
        },
        {
            versionKey:false
        }
    )
    const ProductModel=mongoose.model("ProductsCollection",Product);
    return ProductModel;
}
module.exports={getProductModel};
