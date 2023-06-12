const db = require("../../db/db");

const queries = require("./queries");
const { appendUniqueSuffix } = require("./utils");

module.exports = {
  getUserById: (req, res) => {
    const id = decodeURI(req.params.id);
    db.query(queries.getUserById, [id]).then((result) => {
      result.rows.length === 0
        ? res.sendStatus(404)
        : res.status(200).json(result.rows[0]);
    });
  },

  getUserByUsername: (req, res) => {
    const username = decodeURI(req.params.username);
    db.query(queries.getUserByUsername, [username]).then((result) => {
      result.rows.length === 0
        ? res.sendStatus(404)
        : res.status(200).json(result.rows[0]);
    });
  },

  createUser: (req, res) => {
    const { sub, email, name, nickname, picture } = req.body;

    // Does provided sub match sub in JWT?
    if (req.auth.payload.sub === req.body.sub) {
      // Does this user already exist?
      db.query(queries.getUserById, [req.body.sub]).then((result) => {
        if (result.rows.length === 0) {
          db.query(queries.createUser, [
            sub,
            appendUniqueSuffix(nickname),
            email,
            name,
            nickname,
            picture,
          ]).then((result) => {
            res.sendStatus(201);
          });
        } else res.sendStatus(403);
      });
    } else res.sendStatus(403);
  },

  deleteUser: (req, res) => {
    console.log("Delete user");
  },

  updateUser: (req, res) => {
    console.log("Update user");
  },
};
