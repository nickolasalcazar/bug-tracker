module.exports = {
  getUserById: "SELECT * FROM users WHERE user_id = $1",
  getUserByUsername: `
    SELECT 
      user_id,
      username,
      nickname,
      picture,
      conn.pending AS "connection_pending",
      conn.connected AS "connected",
      conn.sender AS "sender"
    FROM users
    LEFT JOIN user_connections conn
      ON (user_id = sender AND $2 = receiver) OR (user_id = receiver AND $2 = sender)
    WHERE username = $1`,
  createUser:
    "INSERT INTO users(user_id, username, email, name, nickname, picture) VALUES ($1, $2, $3, $4, $5, $6)",
  getConnections: `SELECT
      user_id,
      username,
      nickname
    FROM users
    WHERE user_id IN (
      (SELECT sender FROM user_connections
        WHERE receiver = $1 AND connected = TRUE)
      UNION
      (SELECT receiver FROM user_connections
        WHERE sender = $1  AND connected = TRUE))`,
  addConnection:
    "INSERT INTO user_connections(sender, receiver) VALUES ($1, $2)",
  removeConnection:
    "DELETE FROM user_connections WHERE ($1 = sender AND $2 = receiver) OR ($1 = receiver AND $2 = sender)",
  acceptConnection: `
    UPDATE user_connections
    SET pending = FALSE, connected = TRUE, date_accepted = NOW()
    WHERE sender = $1 AND receiver = $2`,
};
