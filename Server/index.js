// creating http server

const http = require("http");
const fs = require("fs");

const myServer = http.createServer((req, res) => {
  const date = new Date();

  const log = `
  ${date.toDateString()} 
  ${date.getSeconds()} 
  ${req.url} 
  
  : New Request Received\n`;
  fs.appendFile("log.text", log, (err, result) => {
    switch (req.url) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        res.end("About Page");
        break;
      case "/contact":
        res.end("Contact Page");
        break;
      default:
        res.end("404");
        break;
    }
  });

  res.end("Hello From Server");
});

myServer.listen(8000, () => {
  console.log("Server Started...");
});
