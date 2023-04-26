const db = require("../../db");

const queries = require("./queries");

module.exports = {
  getUser: (req, res) => {
    console.log("Get user");
    // db.query(queries.getStudents, [])
    //   .then((result) => {
    //     res.status(200).json(result.rows);
    //   })
    //   .catch((error) => {
    //     console.log("Error", error);
    //     res.sendStatus(500);
    //   });
  },

  getUserById: (req, res) => {
    const id = parseInt(req.params.id);
  },

  addUser: (req, res) => {
    const { name, email, age, dob } = req.body;
    console.log("Add user");
  },

  deleteUser: (req, res) => {
    console.log("Delete user");
  },

  updateStudent: (req, res) => {
    console.log("Update user");
  },
};
