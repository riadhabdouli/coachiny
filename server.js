const app = require("./backend/app");
const debug = require("debug")("node-angular");
const http = require("http");
const express=require('express');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false,limit :'50mb' }));

const fileUpload = require('express-fileupload');
app.use(fileUpload());

require('dotenv').config();
const cors = require('cors');
app.use(cors());
global.publicPath = __dirname+'/backend/images';

app.use(function(req, res, next){
	global.req=req;
	next();
});

app.use(express.static(__dirname + '/backend/images'));

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

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
