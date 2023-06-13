module.exports = {
  getUserById: "SELECT * FROM users WHERE user_id = $1",
  getUserByUsername: "SELECT * FROM users WHERE username = $1",
  createUser:
    "INSERT INTO users(user_id, username, email, name, nickname, picture) VALUES ($1, $2, $3, $4, $5, $6)",
  addConnection: "INSERT INTO user_connections(user1, user2) VALUES ($1, $2)",
  removeConnection:
    "DELETE FROM user_connections WHERE ($1 = user1 AND $2 = user2) OR ($1 = user2 AND $2 = user1)",
  acceptConnection: `
    UPDATE user_connections
    SET pending = FALSE, connected = TRUE
    WHERE ($1 = user1 AND $2 = user2) OR ($1 = user2 AND $2 = user1)`,
};
