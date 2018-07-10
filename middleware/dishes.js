const mongoose = require('mongoose');
const {ObjectID} = require('mongodb')
const _ = require('underscore');

const {Dish} = require('../model/dish');


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Dishes');


const getDish = (req,res)=>{

    Dish.find().then((dishes)=>{
        res.send(dishes)
    },(e)=>{
        res.status(400).status(e);
    })

}


const addDish = (req,res)=>{
    let dish = new Dish({
        name : req.body.name,
        price : req.body.price,
        partyname : req.body.partyname
    });

    dish.save().then((dishes)=>{
            res.send(dishes)
    },(e)=>{
        res.status(400).status(e);
    })
}



const delDish = (req,res)=>{
    Dish.remove({}).then((dish)=>{
        if(!dish){
            return res.status(400).send("Nothing exist");
        }
        res.send(dish)
       },(e)=>{
           res.status(400).send(e);
       })
}


const getDishById = (req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send("Not a valid id");
    }
    console.log(id);
    Dish.findById(id).then((dish)=>{
     if(!dish){
         return res.status(400).send("Don't exist");
     }
     res.send(dish)
    },(e)=>{
        res.status(400).send(e);
    })
 }


 const updateDishById = (req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['name','price','completed']);
    console.log(req.body)
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    if(_.isBoolean(body.completed)&& body.completed){
        body.completedAt = new Date().getTime();
    }
    else{
        body.completed = false;
        body.completedAt = null;

    }

    
    Dish.findByIdAndUpdate(id,{$set : body},{new : true}).then((dish)=>{
        if(!dish){
            return res.status(404).send("Not Found")
        }

        res.send({dish});

    }).catch((e)=>{
        res.status(400).send();
    })
}


const deleteDishById = (req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(400).send("invaild id")
    }

    Dish.findByIdAndRemove(id).then((dish)=>{
        if(!dish){
            res.status(400).send("Not found")
            throw "Not Found"
        }

        res.send(dish);
    },(e)=>{
        res.status(400).send(e)
    }).catch((e)=>{
        res.status(400).send(e)
    })
}


module.exports = {
    addDish,
    getDish,
    delDish,
    getDishById,
    updateDishById,
    deleteDishById
}
