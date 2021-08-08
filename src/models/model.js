const mongoose = require('mongoose');
const validator = require('validator');

const ApiSchema = mongoose.Schema({
    name:{
        type:String,
        requried:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    contact:{
        type:Number,
        required:true,
        unique:true,
        min:10
    },
    concern:{
        type:String,
        required:true,
        minLength:30
    }

})

const ApiModel = mongoose.model('ApiModel',ApiSchema);
module.exports = ApiModel;