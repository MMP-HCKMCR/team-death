'use strict';

try {
    /////////////////////////////////////
    // config
    /////////////////////////////////////
    var config = require('./config.js');

    
    /////////////////////////////////////
    // load required libraries
    /////////////////////////////////////
    var http = require('http');
    var path = require('path');
    var express = require('express');
    var bodyParser = require('body-parser');
    var lessMiddleware = require('less-middleware');


    /////////////////////////////////////
    // setup express
    /////////////////////////////////////
    var app = express();
    app.set('port', (process.env.PORT || config.port));

    // body JSON parsing
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // set public path
    var public_path = path.join(__dirname, 'public');

    // compile less
    app.use(lessMiddleware(public_path, {
        dest: public_path,
        force: true,
        preprocess: {
            path: function(pathname, req) {
                var csspath = path.sep + 'css' + path.sep;
                return pathname.replace(csspath, csspath + 'less' + path.sep);
            }
        }
    }));

    app.use(express.static(public_path));


    /////////////////////////////////////
    // setup view engine
    /////////////////////////////////////
    app.set('view engine', 'pug');


    /////////////////////////////////////
    // load and setup API
    /////////////////////////////////////
    app.use('/rest/api', require('./rest/api.js')());


    /////////////////////////////////////
    // setup page + action routes
    /////////////////////////////////////
    //app.use('/', require('./routes/pages.js')());


    /////////////////////////////////////
    // hook node onto ip:port
    /////////////////////////////////////    
    http.createServer(app).listen(app.get('port'), function() {
        console.log('Running on http://localhost:' + app.get('port'));
    });
}
catch (err) {
    console.log(err);
    throw err;
}