var express = require('express');
var app = express();

var http = require('http');
var path = require('path');
var fs = require('fs');
var util = require('util');
var sys = require('sys');

var port = '1337';
var now = (new Date()).getTime();
var projectFolder = '';

// Main server app, handles requests and servers files
http.createServer(function (req, res) {

    var filePath = req.url;

    try {
        var result = fs.lstatSync('.' + filePath + '/');

        if(result.isDirectory()) {
            if(filePath.lastIndexOf('/') != filePath.length-1 && filePath.indexOf('.') < 0) {
                filePath += '/';
            }
            projectFolder = filePath;
            filePath += 'index.html';
        }
    }
    catch(ex) {
        //console.log(ex.message);
    }

    if (filePath == './' || filePath == '/') {
        filePath = '.' + 'index.html';
    }
    else {
        if( !filePath.match(projectFolder) )
            filePath = projectFolder + filePath;

        filePath = '.' + filePath;
    }

    if(filePath.indexOf('toImage') > -1) {
        res.writeHead(200);
        
        var rand = (Math.random()).toString().substr(0, 8).replace('.', '');
        var name = 'image' + rand + '.png';
        var dir = projectFolder + 'exports/';

        uploadFile(req, name, dir, function() {
            var response = JSON.stringify({ 
                file: dir + name, 
                status: 1, 
                message: 'Success.' 
            });
            res.write(response);

            res.end();
        });
    }

    var contentType = 'text/html';

    switch (path.extname(filePath)) {
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
    }

    fs.exists(filePath, function (exists) {

        if (exists) {
            fs.readFile(filePath, function (error, data) {
                if (error) {
                    res.writeHead(500);
                    res.end();
                }
                else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.write(data, 'utf-8');
                    res.end();
                }
            });
        }
        else {
            res.writeHead(404);
            res.end();
        }

    });

}).listen(port);

console.log('Server started at: ' + now + ', listening at: ' + port);

// Upload a file with AJAX
var uploadFile = function (req, fileName, dir, callback) {

    var dest = dir + fileName;
    var string = '';

    req.on('data', function (data) {
        if (data.length <= 0) {
            return false;
        }

        string += data;
    });

    req.on('end', function () {
        var img = string.toString().replace(/^data:image\/\w+;base64,/, "");
        var buffer = new Buffer(img, 'base64');
        
        fs.writeFileSync(dir + fileName, buffer);
        
        callback();
    });

};

// Move the uploaded file to a default directory
var moveFile = function (source, dest, callback) {
    var is = fs.createReadStream(source);

    is.on('error', function (err) {
        console.log('moveFile() - Could not open readstream.');
    });

    is.on('data', function (data) {
        var os = fs.createWriteStream(dest);

        os.on('error', function (err) {
            console.log('moveFile() - Could not open writestream.');
        });

        os.on('open', function () {

            os.write(data);

            fs.unlinkSync(source);

            callback();

            os.end();
        });

        os.on('close', function() {
            console.log('OS destroyed');
            os.destroy();
        });
    });

    is.on('end', function() {
        console.log('IS destroyed');
        is.destroy();
    });
};