
/**
 * Module dependencies.
 */

// libraries
var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var lessMiddleware = require("less-middleware");
var mongoose = require('mongoose');

// Routes
var index = require('./routes/index');
var search = require('./routes/search');
var help = require('./routes/help');
var settings = require('./routes/settings');
var login = require('./routes/login');
var logout = require('./routes/logout');
var user = require('./routes/user');
var photo = require('./routes/photo');
var terms = require('./routes/terms');

// Ajax routes
var swipes = require('./routes/get_more_swipes.js');
// var modal = require('./routes/modal.js');


// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'rekindle';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

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
app.use(lessMiddleware({
    src: __dirname + "/less/custom",
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
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ACTUAL URLS
app.locals.layout = './main.handlebars';
app.get('/', index.view);
app.get('/index', index.view);
app.get('/alternate', index.viewAlternate);
app.get('/help', help.view);
app.get('/settings', settings.view);
app.get('/search', search.view);
app.get('/login', login.view);
app.get('/logout', logout.view);

app.get('/terms', terms.terms);
app.get('/privacy-policy', terms.privacy)

// app.get('/getAbout', photo.getAbout);

// Ajax URLs
app.post('/getSwipes', swipes.getMore);
app.post('/getFriend', user.getFriend);
app.get('/getFriendAbout/:id', user.getFriendAbout);

app.get('/autocomplete.json', search.getAutocompleteJSON);
app.post('/updateQueue', user.updateQueue);
app.post('/updateSwipes', user.updateSwipe);

app.post('/saveFriends', user.addFriends);
app.post('/saveUser', user.saveUser);


// Create server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});