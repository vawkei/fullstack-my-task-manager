const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
    task:{
        type:String,
        trim:true,
        required:[true,"Input Shouldn't be EMPTY!!!"],
        maxlength:[40,"Characters should be less than 40"]
    }
    
});

module.exports = mongoose.model("tasks",taskSchema)