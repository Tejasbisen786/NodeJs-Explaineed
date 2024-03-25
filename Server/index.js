// creating http server
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.method} : ${
    req.url
  } : New Request Received \n`;
  const myUrl = url.parse(req.url, true);
  console.log(myUrl);

  fs.appendFile("log.text", log, (err, result) => {
    switch (myUrl.pathname) {
      case "/":
        if (req.method === "GET") res.end("HomePage");
        break;
      case "/about":
        const userName = myUrl.query.myName;
        res.end(` MyName is ${userName}`);
        break;

      case "/contact":
        res.end("Contact Page");
        break;

      case "/signup":
        if (req.method === "GET") res.end("this is sign up form ");
        else if (req.method === "POST") {
          res.end("Sucess");
        }

      default:
        res.end("404");
        break;
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server Started...");
});
