const express = require('express');

const router = express.Router();

/* Todo Schema create under models */
const Todo = require('../models/todo');

/* get all todo */
router.get('/:userId', async (req, res) => {
    try {
        Todo.find({ userId: req.params.userId }, (error, docs) =>{
            if(error) res.send(error);
            else{
                console.log((new Date()).toString() + " todo/:userId");
                res.json(docs);
            }
        });  
    }
    catch (err) {
        res.send(err.message);
    }
});

/* post one todo{name, userId} */
router.post('/', async (req, res) => {
    console.log(req.body.name);
    const todo = new Todo({ name: req.body.name, userId: req.body.userId });
    try {
        const savedTodo = await todo.save();
        console.log((new Date()).toString() + " POST TODO");
        res.json(savedTodo);
    }
    catch (err) {
        res.send(err.message);
    }
});

/* delete one todo by id */
router.delete('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    try {
        const deletedTodo = await todo.delete();
        console.log((new Date()).toString() + " DELETE TODO");
        res.json(deletedTodo);
    }
    catch (err) {
        res.send(err.message);
    }
});

module.exports = router;