const mongoose = require('mongoose');
let Dish = mongoose.model('Dish' , {
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
    Dish
}