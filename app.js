
/**
 * Module dependencies.
 */

// libraries

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var lessMiddleware = require("less-middleware");

// Routes
var index = require('./routes/index');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Rekindle secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// Less middleware
app.use(lessMiddleware({
    src: __dirname + "/less",
    dest: __dirname + "/public/css",
    // if you're using a different src/dest directory, you
    // MUST include the prefex, which matches the dest
    // public directory
    prefix: "/css",
    // force true recompiles on every request... not the
    // best for production, but fine in debug while working
    // through changes
    force: true
}));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ACTUAL URLS
app.locals.layout = './main.handlebars';
app.get('/', index.view);
app.get('/index', index.view);

// Create server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});