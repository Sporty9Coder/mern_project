const mongoose=require("mongoose");

    let User=new mongoose.Schema(
        {
            name:String,
            email:{type:String,unique:true},
            country:String,
            gender:String,
            age:Number,
            city:String,
            address:String,
            picname:String
        },
        {
            versionKey:false
        }
    )
    const UserModel=mongoose.model("UserCollection",User);


    let doSignUp=new mongoose.Schema(
        {
            emailid:{type:String,unique:true},
            password:String,
            usertype:String
        },
        {
            versionKey:false
        }
    )
    const signUpModel=mongoose.model("SignUpCollection",doSignUp);


    let Grower=new mongoose.Schema({
        name:String,
        email:{type:String,unique:true},
        address:String,
        city:String,
        category:String,
        mobile:Number,
        aadharno:Number,
        picpath:String
    },
    {
        versionKey:false
    }
    )
    const growerModel=mongoose.model("GrowerProfile",Grower);


    let Aproduct=new mongoose.Schema(
        {
            email:String,
            item:Array,
            city:String,
            category:String
        },
        {
            versionKey:false
        }
    )
    const AvailProductModel=mongoose.model("AvailProductCollection",Aproduct);


module.exports={UserModel,signUpModel,growerModel,AvailProductModel};
