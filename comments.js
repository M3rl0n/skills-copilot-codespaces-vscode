// create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
// read file
const comments = require('./comments.json');
// create a server
app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
// use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// create a route
app.get('/comments', function(req, res) {
    res.json(comments);
});
// create a route
app.post('/comments', function(req, res) {
    // get the data
    const comment = req.body;
    // add the data
    comments.push(comment);
    // write the data
    fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        res.json(comment);
    });
});
// create a route
app.get('/comments/:id', function(req, res) {
    // get the id
    const id = req.params.id;
    // find the comment
    const comment = comments.find(function(comment) {
        return comment.id == id;
    });
    // response
    res.json(comment);
});
// create a route
app.put('/comments/:id', function(req, res) {
    // get the id
    const id = req.params.id;
    // get the data
    const newComment = req.body;
    // find the comment
    const comment = comments.find(function(comment) {
        return comment.id == id;
    });
    // update the comment
    comment.name = newComment.name;
    comment.email = newComment.email;
    comment.message = newComment.message;
    // write the data
    fs.writeFile('./comments.json', JSON.stringify(comments), function(err) {
        if (err) {
            console.log(err);
            res.status(500).send('Server Error');
        }
        res.json(comment);
    });
});
// create a route
app.delete('/comments/:id', function(req, res) {
    // get the id
    const id = req.params.id;
    // find the comment
    const commentIndex = comments.findIndex(function(comment) {
        return comment.id == id;
    });
    // delete the comment
    comments.splice(commentIndex, 1);
