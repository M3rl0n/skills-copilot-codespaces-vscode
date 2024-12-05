//Create web server
const express = require('express');
const app = express();
app.use(express.json());
//Create a comments array
const comments = [
    {id: 1, username: "John", comment: "Hello"},
    {id: 2, username: "Jane",