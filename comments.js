// Create web server
const express = require('express'); //import express
const app = express(); //create express object
const port = 3000; //port number
const bodyParser = require('body-parser'); //import body-parser
const fs = require('fs'); //import fs
const path = require('path'); //import path
const commentsPath = path.join(__dirname, 'comments.json'); //path to comments.json
const comments = require('./comments.json'); //import comments.json
app.use(bodyParser.json()); //use body-parser
app.use(bodyParser.urlencoded({ extended: true })); //use body-parser
app.use(express.static('public')); //use static files
app.get('/comments', (req, res) => { //get request
    res.json(comments); //send comments
});
app.post('/comments', (req, res) => { //post request
    comments.push(req.body); //add new comment
    fs.writeFile(commentsPath, JSON.stringify(comments), (err) => { //write comments to comments.json
        if (err) {
            res.status(500).send('Server Error'); //send error
        } else {
            res.status(201).send('Comment Added'); //send success
        }
    });
});
app.listen(port, () => { //listen on port
    console.log(`Server listening on port ${port}`); //log message
});