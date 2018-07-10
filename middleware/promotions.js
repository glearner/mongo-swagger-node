const mongoose = require('mongoose');
const {ObjectID} = require('mongodb')
const _ = require('underscore');

const {Promotion} = require('../model/promotion');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/promotions');


const getPromotion = (req,res)=>{

    Promotion.find().then((promotions)=>{
        res.send(promotions)
    },(e)=>{
        res.status(400).status(e);
    })
}


const addPromotion = (req,res)=>{
    let promotion = new Promotion({
        name : req.body.name,
        price : req.body.price
    }); 

    promotion.save().then((promotions)=>{
            res.send(promotions)
    },(e)=>{
        res.status(400).status(e);
    })
}

const delPromotion = (req,res)=>{
    Promotion.remove({}).then((Promotion)=>{
        if(!Promotion){
            return res.status(400).send("Nothing exist");
        }
        res.send(Promotion)
       },(e)=>{
           res.status(400).send(e);
       })
}


const getPromotionById = (req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send("Not a valid id");
    }
    console.log(id);
    Promotion.findById(id).then((Promotion)=>{
     if(!Promotion){
         return res.status(400).send("Don't exist");
     }
     res.send(Promotion)
    },(e)=>{
        res.status(400).send(e);
    })


 }

const updatePromotionById = (req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['name','price','completed']);
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

    console.log(body);

    Promotion.findByIdAndUpdate(id,{$set : body},{new : true}).then((Promotion)=>{
        if(!Promotion){
            return res.status(404).send("Not Found")
        }

        res.send({Promotion});

    }).catch((e)=>{
        res.status(400).send();
    })
}


const deletePromotionById = (req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(400).send("invaild id")
    }

    Promotion.findByIdAndRemove(id).then((Promotion)=>{
        if(!Promotion){
            res.status(400).send("Not found")
            throw "Not Found"
        }

        res.send(Promotion);
    },(e)=>{
        res.status(400).send(e)
    }).catch((e)=>{
        res.status(400).send(e)
    })
}


module.exports = {
    addPromotion,
    getPromotion,
    delPromotion,
    getPromotionById,
    updatePromotionById,
    deletePromotionById

}
