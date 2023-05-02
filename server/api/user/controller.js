const db = require("../../db/db");

const queries = require("./queries");

module.exports = {
  getUsers: (req, res) => {
    console.log("Example: get all user");
    // db.query(queries.getStudents, [])
    //   .then((result) => {
    //     res.status(200).json(result.rows);
    //   })
    //   .catch((error) => {
    //     console.log("Error", error);
    //     res.sendStatus(500);
    //   });
  },

  /**
   * Get user by ID. If user does not exist, return 'user does not exist'.
   */
  getUser: (req, res) => {
    const id = parseInt(req.params.id);
    db.query(queries.getUser, id).then((result) => {
      console.log("Does user exist? ", result.rows);
    });
  },

  addUser: (req, res) => {
    const { name, email, age, dob } = req.body;
    console.log("Add user");
  },

  deleteUser: (req, res) => {
    console.log("Delete user");
  },

  updateUser: (req, res) => {
    console.log("Update user");
  },
};
