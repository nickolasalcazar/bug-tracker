const express = require("express");
const {
  // getAdminMessage,
  // getProtectedMessage,
  // getPublicMessage,
} = require("./user.service");
const {
  checkRequiredPermissions,
  validateAccessToken,
} = require("../middleware/auth0.middleware.js");

const db = require("../../db");

const userRouter = express.Router();

// Get information about a user
userRouter.get("/get", validateAccessToken, (req, res) => {
  console.log("getting a user");
});

// Create a new user
userRouter.get("/create", validateAccessToken, (req, res) => {
  // db.query("INSERT INTO users $1", ["username"]);
  console.log('example query: "INSERT INTO users $1", ["username"]');
});

// Delete a user
userRouter.get("/delete", validateAccessToken, (req, res) => {
  console.log("deleting a user");
});

// userRouter.get("/public", (req, res) => {
//   const message = getPublicMessage();

//   res.status(200).json(message);
// });

// userRouter.get("/protected", validateAccessToken, (req, res) => {
//   const message = getProtectedMessage();

//   res.status(200).json(message);
// });

// userRouter.get(
//   "/admin",
//   validateAccessToken,
//   checkRequiredPermissions([AdminMessagesPermissions.Read]),
//   (req, res) => {
//     const message = getAdminMessage();

//     res.status(200).json(message);
//   }
// );

module.exports = { userRouter };
