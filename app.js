var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var index = require('./routes/index');
var users = require('./routes/dbAPI/users');
var games = require('./routes/dbAPI/games');
var login = require('./routes/dbAPI/login');
var register = require('./routes/register');
var lobbyRoom = require('./routes/lobbyRoom');
var leaders = require('./routes/leaders');
var gameplay = require('./routes/gameplay');
var test = require('./routes/login-page');
var create_game = require('./routes/create_game');
var logout = require('./routes/logout');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/dbAPI/users', users);
app.use('/dbAPI/games', games);
app.use('/dbAPI/login', login);
app.use('/register', register);
app.use('/leaders', leaders);
app.use('/gameplay', gameplay);
app.use('/lobbyRoom', lobbyRoom);
app.use('/login-page', test);
app.use('/create_game', create_game);
app.use('/logout', logout);
app.use(session({secret: 'keyboard cat', cookie: {maxAge: 60000}, resave: true, saveUninitialized: true}))

app.set('json spaces', 40);

app.set('view options', {pretty: true});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
