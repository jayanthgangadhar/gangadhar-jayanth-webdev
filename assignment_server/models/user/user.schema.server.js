var mongoose = require("mongoose");
// var websiteModel = require("../website/website.model.server");

var userSchema = mongoose.Schema({
    username: {type:String,unique: true},
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    google:{
        id:String,
        token:String
    },
    websites:[{type:mongoose.Schema.Types.ObjectId, ref:"websiteModel"}],
    following:[{type:mongoose.Schema.Types.ObjectId, ref:"websiteModel"}],
    followers:[{type:mongoose.Schema.Types.ObjectId, ref:"websiteModel"}],
    dateCreated: {type: Date, default: Date.now()}
},{collection: "user"});

module.exports = userSchema;