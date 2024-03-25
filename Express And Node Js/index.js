const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello From Home Page");
});

app.get("/about", (req, res) => {
  return res.send("Hello From About Page" + req.query.name + req.query.id);
});

app.listen(8000, () => {
  console.log("Server is Connected on port 8000");
});
