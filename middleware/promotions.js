const mongoose = require('mongoose');
const {ObjectID} = require('mongodb')
const _ = require('underscore');

const {Promotion} = require('../model/promotion');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/promotions');

const manageData = require('../db/manage');

const getPromotion = (req,res)=>{

   manageData.getData(req,res,Promotion);
}


const addPromotion = (req,res)=>{
   
    manageData.addData(req,res,Promotion);
}

const delPromotion = (req,res)=>{
    manageData.delData(req,res,Promotion);
}


const getPromotionById = (req,res)=>{
    
    manageData.getDataById(req,res,Promotion);


 }

const updatePromotionById = (req,res)=>{
    
    manageData.updateDataById(req,res,Promotion);

}


const deletePromotionById = (req,res)=>{
    
    manageData.deleteDataById(req,res,Promotion);
}


module.exports = {
    addPromotion,
    getPromotion,
    delPromotion,
    getPromotionById,
    updatePromotionById,
    deletePromotionById

}
