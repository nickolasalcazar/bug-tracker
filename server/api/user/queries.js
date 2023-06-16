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
      nickname,
      picture
    FROM users
    WHERE user_id IN (
      (SELECT sender FROM user_connections
        WHERE receiver = $1 AND connected = TRUE)
      UNION
      (SELECT receiver FROM user_connections
        WHERE sender = $1  AND connected = TRUE))`,
  getConnectionsByUsername: `SELECT
      other.user_id,
      other.username,
      other.nickname,
      other.picture
    FROM users curr
    JOIN user_connections uc ON
      (sender = curr.user_id OR receiver = curr.user_id)
    JOIN users other 
      ON (uc.sender = other.user_id OR uc.receiver = other.user_id)
    WHERE curr.username = $1 AND other.username != $1 AND uc.connected = TRUE`,
  getPendingConnections: `SELECT                                        
      sender AS user_id,
      sender.username AS username,
      sender.nickname AS nickname,
      sender.picture AS picture,
      date_requested
    FROM user_connections c
    JOIN users u ON u.user_id = receiver
    JOIN users sender ON sender.user_id = sender
    WHERE receiver = $1 AND u.user_id = $1 AND pending = TRUE`,
  addConnection:
    "INSERT INTO user_connections(sender, receiver) VALUES ($1, $2)",
  removeConnection:
    "DELETE FROM user_connections WHERE ($1 = sender AND $2 = receiver) OR ($1 = receiver AND $2 = sender)",
  acceptConnection: `
    UPDATE user_connections
    SET pending = FALSE, connected = TRUE, date_accepted = NOW()
    WHERE sender = $1 AND receiver = $2`,
};
