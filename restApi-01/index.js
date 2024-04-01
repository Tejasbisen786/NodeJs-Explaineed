const express = require("express");
const app = express();
const PORT = 8000;
const userRouter = require("./routes/userRoutes");
const  connectMongodb  = require("./coonection.js");
const logReqRes  = require("./middleware/index");

// MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//connection
connectMongodb("mongodb://localhost:27017/myapp-01");

// Routes
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is Running on Port:  ${PORT}`);
});
