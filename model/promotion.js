const mongoose = require('mongoose');
let Promotion = mongoose.model('Promotion' , {
    name : {
        type : String,
        required : true,
        trim : true
    },
    price : {
        type : Number,
        default : 100
    },
    completed : {
        type : Boolean,
        default : false
    }
});

module.exports = {
    Promotion
}