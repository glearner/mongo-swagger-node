const mongoose = require('mongoose');
let Leadership = mongoose.model('Leadership' , {
    name : {
        type : String,
        required : true,
        trim : true
    },
    salary : {
        type : Number,
        default : 100
    },
    partyname : {
        type : String,
        required : true,
        trim : true,
        default : 'Congress'
    },
    completed : {
        type : Boolean,
        default : false
    }
});

module.exports = {
    Leadership
}