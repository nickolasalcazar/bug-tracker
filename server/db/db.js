const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

module.exports = {
  /**
   * Query the database.
   *
   * @example
   * const db = require("./db");
   *
   * db.query("SELECT NOW() as now", [])
   *   .then((res) => {
   *     console.log("res.rows[0] =", res.rows[0]);
   *   })
   *   .catch((error) => console.log(error));
   * @param   {string}  sql
   * @param   {array}   params
   * @returns {res}
   */
  async query(sql, params) {
    const start = Date.now();
    try {
      const res = await pool.query(sql, params);
      const duration = Date.now() - start;
      logQuery(sql, duration, res.rowCount, null);
      return res;
    } catch (error) {
      const duration = Date.now() - start;
      logQuery(sql, duration, null, error.toString());
      throw error;
    }
  },

  /**
   * Check out a client from the pool to run several queries in a row in a transaction.
   * @returns client object
   * @link    https://node-postgres.com/guides/project-structure
   */
  async getClient() {
    const client = await pool.connect();
    const query = client.query;
    const release = client.release;

    // Set a timeout of 5 seconds, after which we will log this client's last query
    const timeout = setTimeout(() => {
      console.error("A client has been checked out for more than 5 seconds!");
      console.error(
        `The last executed query on this client was: ${client.lastQuery}`
      );
    }, 5000);

    // Monkey patch the query method to keep track of the last query executed
    client.query = (...args) => {
      client.lastQuery = args;
      return query.apply(client, args);
    };

    client.release = () => {
      // Clear our timeout
      clearTimeout(timeout);
      // Set the methods back to their old un-monkey-patched version
      client.query = query;
      client.release = release;
      return release.apply(client);
    };
    return client;
  },
};

/**
 * Log a query to the console.
 * @param {string} sql
 * @param {number} duration
 * @param {number} rows
 * @param {any}    error
 */
const logQuery = (sql, duration, rows = null, error = null) => {
  console.log("executed query", {
    sql: sql,
    duration: `${duration} ms`,
    rows: rows,
    error: error,
  });
};
