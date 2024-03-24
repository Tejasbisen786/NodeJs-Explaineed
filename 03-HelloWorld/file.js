const fs = require("fs");

// sync async ->  blocking and unblocking request

// ** Creating a File
//Sync -> Blocking Requests
fs.writeFileSync("./test.txt", "Tejas Bisen");
// Async -> Non Blocking Requests
fs.writeFile("./test1.txt", "Tejas Bisen Async File", (err) => {});

// **reading file
// sync -> returning result
const rsult = fs.readFileSync("./contact.txt","utf-8")
// console.log(rsult)

// expecting and defining callback func
fs.readFile("./contact.txt", "utf-8", (err, result) => {
  if (err) {
    console.log("error", err);
  } else {
    console.log(result);
  }
});

// ** Append File
// new Date().getDate().toLocaleString()
fs.appendFileSync("./test.txt", ` ${Date.now()}hey Tejas\n`);


// copy file
fs.cpSync("./contact.txt", './copyContaxt.txt')

// unlink file / Deleting A File

fs.unlinkSync("./copyContaxt.txt")

console.log(fs.statSync("./test.txt"));