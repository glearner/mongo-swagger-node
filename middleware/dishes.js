const mongoose = require('mongoose');
const {ObjectID} = require('mongodb')
const _ = require('underscore');

const {Dish} = require('../model/dish');
const manageData = require('../db/manage');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Dishes');


const getDish = (req,res)=>{

    manageData.getData(req,res,Dish)

}


const addDish = (req,res)=>{
   
    manageData.addData(req,res,Dish);
}



const delDish = (req,res)=>{
    
    manageData.delData(req,res,Dish);

}


const getDishById = (req,res)=>{
    
    manageData.getDataById(req,res,Dish);
 }


 const updateDishById = (req,res)=>{
    
    manageData.updateDataById(req,res,Dish);
}


const deleteDishById = (req,res)=>{
   
    manageData.deleteDataById(req,res,Dish);
}


module.exports = {
    addDish,
    getDish,
    delDish,
    getDishById,
    updateDishById,
    deleteDishById
}
