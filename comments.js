// create web server
// create a route that listens for a POST request to the /comments path
// create a new comment object and add it to the comments array
// send back a response that contains the new comment object
// start the server
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const comments = [];

app.use(bodyParser.json());

app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  res.status(201).json(newComment);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});



