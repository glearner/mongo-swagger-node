const {ObjectID} = require('mongodb')
let addData= function(req,res,Ref){
    let ref = new Ref({
        name : req.body.name,
        price : req.body.price
    }); 

    ref.save().then((promotions)=>{
            res.send(promotions)
    },(e)=>{
        res.status(400).status(e);
    })
}

let getData  = function (req,res,Ref){

    Ref.find().then((data)=>{
        res.send(data)
    },(e)=>{
        res.status(400).status(e);
    })
}

let delData = function(req,res,Ref){
   Ref.remove({}).then((Ref)=>{
        if(!Ref){
            return res.status(400).send("Nothing exist");
        }
        res.send(Ref)
       },(e)=>{
           res.status(400).send(e);
       })
}

let getDataById = function(req,res,Ref){
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        return res.status(400).send("Not a valid id");
    }
    console.log(id);
    Ref.findById(id).then((Ref)=>{
     if(!Ref){
         return res.status(400).send("Don't exist");
     }
     res.send(Ref)
    },(e)=>{
        res.status(400).send(e);
    })


 }

 let updateDataById = function(req,res,Ref){
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
 
     Ref.findByIdAndUpdate(id,{$set : body},{new : true}).then((Ref)=>{
         if(!Ref){
             return res.status(404).send("Not Found")
         }
 
         res.send({Ref});
 
     }).catch((e)=>{
         res.status(400).send();
     })
 }
 

 let deleteDataById = function(req,res,Ref){
    let id = req.params.id;

    if(!ObjectID.isValid(id)){
        res.status(400).send("invaild id")
    }

    Ref.findByIdAndRemove(id).then((Ref)=>{
        if(!Ref){
            res.status(400).send("Not found")
            throw "Not Found"
        }

        res.send(Ref);
    },(e)=>{
        res.status(400).send(e)
    }).catch((e)=>{
        res.status(400).send(e)
    })
}



module.exports = {
    addData,
    getData,
    delData,
    getDataById,
    updateDataById,
    deleteDataById
}