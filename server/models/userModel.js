const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({

    userType:{
        type:String,
        required:true,
        enum: ['donor','hospital','organization','admin'],
    },

    // is required if userType is admin or donor
    name:{
        type:String,
        required: function() {
            if(this.userType == "admin" || this.userType == "donor"){
                return true;
            }
            return false;
        },
    },

    // is required if userType is hospital
    hospitalName:{
        type:String,
        required: function() {
            if(this.userType == "hospital"){
                return true;
            }
            return false;
        },
    },

    // is required if userType is organisation
    organizationName:{
        type:String,
        required: function() {
            if(this.userType == "organization"){
                return true;
            }
            return false;
        },
    },

    // is required if userType is organisation or hospital
    website:{
        type:String,
        required: function() {
            if(this.userType == "organization" || this.userType == "hospital"){
                return true;
            }
            return false;
        },
    },
    address:{
        type:String,
        required: function() {
            if(this.userType == "organization" || this.userType == "hospital"){
                return true;
            }
            return false;
        },
    },
    owner:{
        type:String,
        required: function() {
            if(this.userType == "organization" || this.userType == "hospital"){
                return true;
            }
            return false;
        },
    },

    // common for all
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

}, { timestamps:true} );

module.exports=mongoose.model("users",userSchema);