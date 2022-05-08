const express = require('express');
const user = require('../models/user');

const User = require('../models/user');

const router = express.Router();

/* gets all users */
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        console.log((new Date()).toString() + " get /user");
        res.json(users);
    }
    catch (err) {
        res.send(err.message);
    }
});
/* gets one user by id */
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        console.log((new Date()).toString() + " get /user:id");
        /* sends only email & name in response */
        const userObj = { email: user.email, name: user.name }
        res.json(userObj);
    }
    catch (err) {
        res.send(err.message);
    }
});

/* creates one user with email, name, password */
router.post('/', async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
    });
    try {
        const savedUser = await newUser.save();
        console.log((new Date()).toString() + " post /user");
        res.json({ id: savedUser._id, name: savedUser.name, email: savedUser.password });
    }
    catch (err) {
        res.send(err.message);
    }
});


module.exports = router;