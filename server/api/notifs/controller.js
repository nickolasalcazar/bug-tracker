const db = require("../../db/db");
const queries = require("./queries");

module.exports = {
  getNotifs: async (req, res) => {
    try {
      const id = req.auth.payload.sub;
      const pendingConns = await db.query(queries.getPendingConnections, [id]);

      const notifs = {
        pendingConnections: pendingConns.rows,
      };

      res.status(200).json(notifs);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  },
};
