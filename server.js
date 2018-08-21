//Required local file Dependencies

// Load Up the Dependencies
var express = require('express');
var bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
var async = require('async');
require('dotenv').config()
var glob = require('glob');

//Configuring the Express Middleware
app = express(),
http = require('http'),
httpServer = http.Server(app);
var obj = [];

app.use(express.static(__dirname));

//Set PORT to Dynamic Environments to run on any Server
var port = process.env.PORT || 5000;

//Configure Express to Recieve JSON and extended URLencoded formats
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//Set RESTful routes
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/getImages', function(req, resp) {
    obj = [];
    var count = 1;
    var dirList = getDirectories('assets/clusters');
    dirList.forEach((element) => {
        getFiles('assets/clusters/' + element, (err, res) => {
            console.log(res);
            obj.push({
                'name': element,
                'images': res
            })
            if (count == dirList.length) {
                resp.status(200).json({
                    "results": obj
                })
            } else {
                count++;
            }

        })
    })
})

app.post('/tagData', function(req, res) {
    console.log(req.body.data);
    res.send("successful");
});

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path+'/'+file).isDirectory();
    });
}

function getFiles (src, callback) {
    glob(src + '/**/*', callback);
};

// Start the server
app.listen(port);
console.log("Server has booted up successfully at PORT : " + port);
