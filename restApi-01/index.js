const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const mongoose = require("mongoose");
const { emit } = require("process");
const { timeStamp } = require("console");
const PORT = 8000;
// MiddleWare
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()} :  ${req.ip} :${req.method} : ${req.path} \n`,
    (err, data) => {
      next();
    }
  );
});

// Connecting Mongodb With express

mongoose
  .connect("mongodb://localhost:27017/myapp-01")
  .then(() => {
    console.log("MongoDb Connected");
  })
  .catch((err) => {
    console.log("Mondo_DB Error", err);
  });

// Schema
const userSchama = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// Creating A Model
const User = mongoose.model("user", userSchama);

// routes

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});

  const html = `  <ul>
${allDbUsers
  .map((user) => `<li> ${user.firstName} -  ${user.email}}</li>`)
  .join("")}
     </ul`;
  res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.email ||
    !body.gender ||
    !body.job_title ||
    !body.last_name
  ) {
    return res.status(400).json({ msg: "All Field Required" });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    jobTitle: body.job_title,
    gender: body.gender,
  });

  console.log("Result", result);
  return res.status(201).json({ msg: "Success" });

  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "Success", id: users.length });
  // });
  // console.log("Create A New users");
});

// Dynamic Path Parameters

app

  .route("/api/users/:id")
  .get(async (req, res) => {
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    return res.json(user);
  })

  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
    return res.json({ status: "success" });
  })

  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Sucess" });
  });

app.listen(PORT, () => {
  console.log(`Server is Running on Port:  ${PORT}`);
});
