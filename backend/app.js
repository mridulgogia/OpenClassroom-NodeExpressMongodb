const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/thing')
// app.use((req, res, next) => {
//     res.status(201);
//     next();
// });

// app.use((req, res, next) => {
//     console.log("request recieved....");
//     next();
// });

// app.use((req, res,next) => {
//     res.json({message: "message..."});
//     next();
// });

// app.use((req, res, next) => {
//     console.log("ending console");
//     res.end('response ends...');
// });

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// mongodb connect: mongodb+srv://mridulgogia:<password>@cluster0-vubuv.mongodb.net/test?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://mridulgogia:abcd1234@cluster0-vubuv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(() => {
  console.log('Mongodb Atlas connected successfully');
})
.catch((error) => {
  console.log('Unable to connect to Mongodb Atlas!');
  console.log(error);
});

app.use(bodyParser.json());

// app.post('/api/stuff', (req, res, next) => {
//   console.log(req.body);
//   res.status(201).json({
//     message: 'ok created'});
// });


app.delete('/api/stuff/:id', (req, res) => {
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

app.put('/api/stuff/:id', (req, res, next) => {
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

app.post('/api/stuff', (req, res) => {
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


app.use('/api/stuff/:id', (req,res,next) => {
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




// app.use('/api/stuff', (req, res, next) => {
//     const stuff = [
//         {
//             _id: 'abcd',
//             title: 'first stuff',
//             description: 'all about first stuff',
//             imageUrl: 'https://image.shutterstock.com/z/stock-photo--d-rendering-glowing-lines-neon-lights-abstract-psychedelic-background-ultraviolet-vibrant-1006797736.jpg',
//             price: 4500,
//             userId: 'gogiamridul',
//           },
//         {
//             _id: 'abcde',
//             title: 'second stuff',
//             description: 'all about second stuff',
//             imageUrl: 'https://image.shutterstock.com/z/stock-photo--d-rendering-glowing-lines-neon-lights-abstract-psychedelic-background-ultraviolet-vibrant-1006797736.jpg',
//             price: 2500,
//             userId: 'gogiamridul',
//           },
//     ];
//     res.status(200).json(stuff);
// });



app.use('/api/stuff', (req, res, next) =>{
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


module.exports = app;
