// ** Node Architecture
const fs = require("fs");

// client --> make a request  --> server
// --> event queue --> event loop -->

//   Request :  1) Blocking Opearations   ( Sync & Async)
//      2) Non- Blocking Operations

// --> response to the user

// blocking operations  --> thred --> thread pool -> res

// **code


const result = fs.readFileSync("./contact.txt", "utf-8");

console.log(result);
