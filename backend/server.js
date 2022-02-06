const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const app = express();
// app.use(express.static(__dirname+'/public'));
app.use(bodyParser({limit: '50mb'}));
var multer = require('multer');
app.use(cors());
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})
var upload = multer({ storage: storage }).single('file')

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT, OPTIONS");
  next();
})

// simple route
app.get("/", (req, res) => {
  // res.json({ message: "Welcome!" });
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

const db = require("./app/models");
db.sequelize.sync();

require("./app/routes/user.routes")(app);
require("./app/routes/auth.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/group.routes")(app);
require("./app/routes/groupsstudents.routes")(app);
require("./app/routes/classes.routes")(app);
require("./app/routes/textbook.routes")(app);
require("./app/routes/languages.routes")(app);
require("./app/routes/howdidyouhear.routes")(app);
require("./app/routes/bill.routes")(app);
require("./app/routes/notes.routes")(app);
require("./app/routes/lesson.routes")(app);
require("./app/routes/teacher.routes")(app);
require("./app/routes/lessoninfo.routes")(app);
require("./app/routes/topics.routes")(app);
require("./app/routes/room.routes")(app);
require("./app/routes/more.routes")(app);
require("./app/routes/markingscheme.routes")(app);
require("./app/routes/common.routes")(app);

app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.send(req.file)
  })
});

app.post('/fetchImage/:file(*)', function (req, res) {
  let file = req.params.file;
  let fileLocation = path.join('../public/', file);
  //res.send({image: fileLocation});
  // res.sendFile(`${fileLocation}`)
  res.sendFile(path.join(__dirname, '/public/', `${fileLocation}`));
})

const debug = require("debug")("node-angular");
const http = require("http");

const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};

const allowedExt = [
  '.js',
  '.ico',
  '.css',
  '.png',
  '.jpg',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
];

app.get('*', (req, res) => {
  if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
    res.sendFile(path.resolve(`public/${req.url}`));
  }
});
const port = normalizePort("8080");

app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);