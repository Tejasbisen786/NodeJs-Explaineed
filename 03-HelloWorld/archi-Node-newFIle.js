const fs = require("fs");
const os= require("os")

// console.log("1")
// //Blocking
// const res = fs.readFileSync("test.txt", "utf-8")
// console.log(res)

// console.log("2")

// Non _blocking -> async
console.log("1");
//Blocking
fs.readFile("test.txt", "utf-8", (err, result) => {
  console.log(result);
});

console.log("2");

// default thread pool size -> 4 
//  maximum thread pool size  -> 8 core depend on system


console.log(os.cpus().length); // number of core
console.log(os.cpus());