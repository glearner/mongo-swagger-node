const mongoose = require('mongoose');
const {ObjectID} = require('mongodb')
const _ = require('underscore');


const {Leadership} = require('../model/leardership');

const manageData = require('../db/manage');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/leaderships');




const getLeadership = (req,res)=>{

    manageData.getData(req,res,Leadership);

}


const addLeadership = (req,res)=>{
   
    manageData.addData(req,res,Leadership);
}



const delLeadership = (req,res)=>{
   
    manageData.delData(req,res,Leadership);
}


const getLeadershipById = (req,res)=>{
    
    manageData.getDataById(req,res,Leadership);


 }


 const updateLeadershipById = (req,res)=>{
    
    manageData.updateDataById(req,res,Leadership);
}


const deleteLeadershipById = (req,res)=>{
    manageData.deleteDataById(req,res,Leadership);
}


module.exports = {
    addLeadership,
    getLeadership,
    delLeadership,
    getLeadershipById,
    updateLeadershipById,
    deleteLeadershipById

}
