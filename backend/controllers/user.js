const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then( (hash) => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then( () => {
            res.status(201).json({
                message: "ok created",
            });
        })
        .catch( (error) => {
            res.status(500).json({error});
        });
    })
    .catch( (error) => {
        res.status(500).json({error});
    });
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email})
    .then( (user) => {
        if(!user){
            return res.status(401).json( {
                error: new error ("User not found!"),
            })
        }
        bcrypt.compare(req.body.password, user.password)
        .then( (valid) => {
            if(!valid){
                res.status(401).json({
                    error: new error ("Incorrect Password")});    
            }
            const token = jwt.sign( {username: user.username}, 
                'RANDOMSTRING', 
                { expiresIn: '24h' });
            res.status(200).json({
                userId: user._id,
                token:token
            })
        })
        .catch( (error) => {
            res.status(500).json({error});
        });
    })
    .catch( (error) => {
        res.status(500).json({error});
    });
};