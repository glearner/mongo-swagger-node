const mongoose = require('mongoose');
const {ObjectID} = require('mongodb')
const _ = require('underscore');


const {Leadership} = require('../model/leardership');



mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/leaderships');




const getLeadership = (req,res)=>{

    Leadership.find().then((leaderships)=>{
        res.send(leaderships)
    },(e)=>{
        res.status(400).status(e);
    })

}


const addLeadership = (req,res)=>{
    let leadership = new Leadership({
        name : req.body.name,
        price : req.body.price,
        partyname : req.body.partyname

    });

    leadership.save().then((leaderships)=>{
            res.send(leaderships)
    },(e)=>{
        res.status(400).status(e);
    })
}



const delLeadership = (req,res)=>{
    Leadership.remove({}).then((Leadership)=>{
        if(!Leadership){
            return res.status(400).send("Nothing exist");
        }
        res.send(Leadership)
       },(e)=>{
           res.status(400).send(e);
       })
}


const getLeadershipById = (req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send("Not a valid id");
    }
    console.log(id);
    Leadership.findById(id).then((Leadership)=>{
     if(!Leadership){
         return res.status(400).send("Don't exist");
     }
     res.send(Leadership)
    },(e)=>{
        res.status(400).send(e);
    })


 }


 const updateLeadershipById = (req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['name','price','partyname','completed']);
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

    Leadership.findByIdAndUpdate(id,{$set : body},{new : true}).then((Leadership)=>{
        if(!Leadership){
            return res.status(404).send("Not Found")
        }

        res.send({Leadership});

    }).catch((e)=>{
        res.status(400).send();
    })
}


const deleteLeadershipById = (req,res)=>{
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(400).send("invaild id")
    }

    Leadership.findByIdAndRemove(id).then((Leadership)=>{
        if(!Leadership){
            res.status(400).send("Not found")
            throw "Not Found"
        }

        res.send(Leadership);
    },(e)=>{
        res.status(400).send(e)
    }).catch((e)=>{
        res.status(400).send(e)
    })
}


module.exports = {
    addLeadership,
    getLeadership,
    delLeadership,
    getLeadershipById,
    updateLeadershipById,
    deleteLeadershipById

}
