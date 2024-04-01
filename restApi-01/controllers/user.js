const User = require("../models/userSchema");

// Get All Users

async function handleGetAllusers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

// getUserById
async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ msg: "User Not Found" });
  return res.json(user);
}

// getfindByIdAndUpdate
async function findByIdAndUpdate(req, res) {
  await User.findByIdAndUpdate(req.params.id, { lastName: "Changed" });
  return res.json({ status: "success" });
}

// findByIdAndDelete
async function deleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Sucess" });
}

//Creating  A New User

async function handleCreateUser(req, res) {
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
  return res.status(201).json({ msg: "Success", id: result._id });
}

module.exports = {
  handleGetAllusers,
  getUserById,
  findByIdAndUpdate,
  deleteUserById,
  handleCreateUser,
};
