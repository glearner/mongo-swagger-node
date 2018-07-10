const mongoose = require('mongoose');
let Cat = mongoose.model('Cat' , {
    name : {
        type : String,
        required : true,
        trim : true
    },
    completedAt : {
        type : String,
        default : null
    },
    completed : {
        type : Boolean,
        default : false
    }
});

module.exports = {
    Cat
}