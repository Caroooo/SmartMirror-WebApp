var express = require("express");
var bodyParser = require('body-parser');
var sqlite = require('sqlite3').verbose();
var fs = require("fs");
var compression = require('compression');
var openModule = require('open');
var serveIndex = require('serve-index');

var file = "smart-mirror-reminders.db";
var exists = fs.existsSync(file);
var app = express();
var db = new sqlite.Database(file);

app.use(compression())

// set default mime type to xml for ".library" files
//express.static.mime.default_type = "text/xml";

app.use(express.static('webapp'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
db.serialize(function() {
    if (!exists) {
        db.run('CREATE TABLE users (id INTEGER PRIMARY KEY NOT NULL, username TEXT, password TEXT, full_name TEXT, gender TEXT, year TEXT, email TEXT, height INT, weight TEXT);');
        db.run('CREATE TABLE appointments (id INTEGER PRIMARY KEY NOT NULL, user_id INT NOT NULL, title TEXT, recurrence TEXT, day TEXT, date TEXT, description TEXT, FOREIGN KEY(user_id) REFERENCES users(id));');
    }
});

app.post("/sign-up", function(request, response) {
    db.serialize(function() {
        var stmt = db.prepare("INSERT INTO users (username, password, full_name, gender, year, email, height, weight) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        stmt.run(request.body.username, request.body.pass, request.body.fullName,request.body.gender,request.body.year,request.body.email,request.body.height,request.body.weight);
        stmt.finalize();
    });
    db.get("SELECT last_insert_rowid()", function(err, row) {
        response.send(JSON.stringify({id: row['last_insert_rowid()']}));
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
  }, 10*1000);
}

// listen for TERM signal .e.g. kill 
process.on ('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on ('SIGINT', gracefulShutdown);  

var server = app.listen(3000);