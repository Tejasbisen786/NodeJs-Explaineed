const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

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

// routes

app.get("/users", (req, res) => {
  const html = `  <ul>
${users.map((user) => `<li> ${user.first_name}</li>`).join("")}
     </ul`;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  // console.log(req.headers)
  // res.setHeader("X-MyName", "bisentejas"); // custom headers
  // ALways add X- to custom headers [Good Practice]
  return res.json(users);
});

app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
  console.log("Create A New users");
});

// Dynamic Path Parameters

app

  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) return res.status(404).json({ msg: "User Not Found" });
    return res.json(user);
  })
  .patch((req, res) => {
    const body = req.body;
    console.log(body);
    return res.json({ status: "Pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "Pending" });
  });

app.listen(PORT, () => {
  console.log(`Server is Running on Port:  ${PORT}`);
});
