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

  // Fetches profile info of a particular user given a username, in addition
  // to the connection (i.e. 'friend') status in relation to the logged in user.
  getUserByUsername: (req, res) => {
    const username = decodeURI(req.params.username);
    const user_id = req.auth.payload.sub;
    db.query(queries.getUserByUsername, [username, user_id]).then((result) => {
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

  addConnection: async (req, res) => {
    const sender = req.auth.payload.sub;
    const receiver = req.params.id;
    if (sender === receiver) {
      sendStatus(400);
      return;
    }
    try {
      await db.query(queries.addConnection, [sender, receiver]);
      res.sendStatus(201);
    } catch (e) {
      if (e.code == 23505) res.sendStatus(400);
      else res.sendStatus(500);
    }
  },

  removeConnection: async (req, res) => {
    const sender = req.auth.payload.sub;
    const receiver = req.params.id;
    try {
      await db.query(queries.removeConnection, [sender, receiver]);
      res.sendStatus(201);
      console.log("response removeConnection: ", response);
    } catch (e) {
      res.sendStatus(500);
    }
  },

  acceptConnection: async (req, res) => {
    const sender = req.auth.payload.sub;
    const receiver = req.params.id;
    try {
      await db.query(queries.acceptConnection, [receiver, sender]);
      res.sendStatus(201);
      console.log("response acceptConnection: ", response);
    } catch (e) {
      console.log("PRINT", e);
    }
  },
};
