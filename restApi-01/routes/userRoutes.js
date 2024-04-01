const express = require("express");
const router = express.Router();
const {
  handleGetAllusers,
  getUserById,
  findByIdAndUpdate,
  deleteUserById,
  handleCreateUser,
} = require("../controllers/user");

// routes
router.route("/").get(handleGetAllusers).post(handleCreateUser);
router
  .route("/:id")
  .get(getUserById)
  .patch(findByIdAndUpdate)
  .delete(deleteUserById);

module.exports = router;
