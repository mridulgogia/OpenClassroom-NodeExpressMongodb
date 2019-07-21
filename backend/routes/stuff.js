const express = require('express');
const router = express.Router();

const Thing = require('../models/thing');


router.delete('/:id', (req, res) => {
    Thing.deleteOne({
      _id: req.params.id,
    })
    .then( () => {
      //console.log('Deleted...');
      res.status(200).json({
        message: "Ok Deleted",
      });
    })
    .catch( (error) => {
      console.log("error in deletion");
      res.status(400).json({error});
    });
  });
  
  router.put('/:id', (req, res, next) => {
    const thing = new Thing({
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    })
    Thing.updateOne({
      _id: req.params.id
    }, thing)
    .then( () =>{
      console.log("update done");
      res.status(200).json({
        message: "ok updated",
      })
    })
    .catch( (error) => {
      console.log("error on updation");
      res.status(404).json({ error});
    });
  });
  
  router.post('/', (req, res) => {
    const thing = new Thing({
      title : req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      userId: req.body.userId,
    });
    thing.save().then( () => {
      console.log("ok created");
      res.status(201).json({
        message: "Post saved successfully",
      })
    }).catch( (error) => {
      console.log("Not created.... failed...");
      res.status(404).json({
        message: "not created",
        error: error,});
    });
  });
  
  
  router.use('/:id', (req,res,next) => {
    Thing.findOne({
      _id: req.params.id
    })
      .then(
       (thing) => {
        //console.log("found one...");
        res.status(200).json(thing);
      }
    )
    .catch( ( error) => {
      console.log("Error in finding one");
      res.status(404).json({error});
    });
  });


router.use('/', (req, res, next) =>{
    Thing.find()
    .then(
      (things) => {
        //console.log('Found...');
        res.status(200).json(things);
    })
    .catch( (error) => {
        console.log('error');
        res.status(404).json({error});
    });
  });

  module.exports = router;