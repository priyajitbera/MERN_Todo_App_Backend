const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const todoRoutes = require('./routes/todo');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');

const DB_URL = 'mongodb://localhost/TodoDB';

const app = express();

mongoose.connect(DB_URL);

const con = mongoose.connection;

con.on('open', () => {
    console.log("Connected to MongoDB...");
});

app.use(express.json());

app.use(cors());

app.use('/todo', todoRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

const PORT = 9000;

app.listen(PORT, () => {
    console.log("Server started, listening to port:"+PORT);
})