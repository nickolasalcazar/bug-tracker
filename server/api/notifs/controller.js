const db = require("../../db/db");
const queries = require("./queries");

module.exports = {
  getNotifs: async (req, res) => {
    res.sendStatus(200);
    // try {
    //   const id = decodeURI(req.params.id);
    //   const response = await db.query(queries.getTaskById, [id]);
    //   if (response.rows.length === 0) res.sendStatus(404);
    //   const task = response.rows[0];
    //   res.status(200).json(task);
    // } catch (e) {
    //   console.log(e);
    //   res.sendStatus(500);
    // }
  },
};
