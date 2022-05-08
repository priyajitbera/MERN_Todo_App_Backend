const express = require('express');

const router = express.Router();

const User = require('../models/user');

/* gets user by email, then matches the password */
router.post('/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        /* finds user by email */
        const users = await User.find({ email: email });
        const user = users[0];
        console.log((new Date()).toString() + " post /auth");
        /* sends _id as response if password matches */
        if (user && user.password === password) {
            res.json({ id: user._id, name: user.name, email: user.email });
        }
        else {
            res.send("Incorrect email or password");
        }
    }
    catch (err) {
        res.send(err.messsage);
    }
});

module.exports = router;