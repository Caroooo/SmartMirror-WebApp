var express = require("express");
var bodyParser = require('body-parser');
var sqlite = require('sqlite3').verbose();
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var fs = require("fs");
var compression = require('compression');
var openModule = require('open');
var serveIndex = require('serve-index');
var User = require('./models/user');
var Reminder = require('./models/reminder');

var file = "smart-mirror-reminders.db";
var exists = fs.existsSync(file);
var app = express();
var db = new sqlite.Database(file);

app.use(compression())

// set default mime type to xml for ".library" files
//express.static.mime.default_type = "text/xml";

app.use(express.static('webapp'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use(session({
    secret: 'passport-sequelize-sample',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/sign-up", function(request, response) {
    User.register(request.body.username, request.body.password, function(err, registeredUser) {
        if (err) {
            response.send({
                error: err,
                msg: "Sorry. That username already exists. Try again."
            });
        } else {
            //registeredUser.role = 'user',
            registeredUser.fullName = request.body.fullName;
            registeredUser.gender = request.body.gender;
            registeredUser.year = request.body.year;
            registeredUser.email = request.body.email;
            registeredUser.height = request.body.height;
            registeredUser.weight = request.body.weight;
            registeredUser.save();
            passport.authenticate('local')(request, response, function() {
                response.send(registeredUser);
            });
        }
    });
});

app.post('/log-in', passport.authenticate('local'), function(request, response) {
    response.send(request.user);
});

app.post("/:userId", function(request, response) {
    var userId = request.params.userId;
    Reminder.create({
        user_id: userId,
        title: request.body.title,
        recurrence: request.body.recurrence,
        day: request.body.day,
        date: request.body.date,
        description: request.body.description
    }).then(function(reminder) {
        response.send(reminder);
    });
});

var gracefulShutdown = function() {
    console.log("Received kill signal, shutting down gracefully.");
    server.close(function() {
        console.log("Closed out remaining connections.");
        db.close();
        process.exit()
    });

    // if after
    setTimeout(function() {
        console.error("Could not close connections in time, forcefully shutting down");
        process.exit()
    }, 10 * 1000);
}

// listen for TERM signal .e.g. kill
process.on('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on('SIGINT', gracefulShutdown);

var server = app.listen(3000);
