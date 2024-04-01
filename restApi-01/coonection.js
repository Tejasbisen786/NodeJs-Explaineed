const mongoose = require("mongoose");

async function connectMongodb(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("MongoDb Connected");
    })
    .catch((err) => {
      console.log("Mondo_DB Error", err);
    });
}

module.exports = connectMongodb;
