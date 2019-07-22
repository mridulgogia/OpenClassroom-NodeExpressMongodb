const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
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
mongoose.set('useCreateIndex', true);
app.use(bodyParser.json());

// app.post('/api/stuff', (req, res, next) => {
//   console.log(req.body);
//   res.status(201).json({
//     message: 'ok created'});
// });
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


app.use("/api/stuff", stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
