module.exports = {
  getUserById: "SELECT * FROM users WHERE user_id = $1",
  getUserByUsername: "SELECT * FROM users WHERE username = $1",
  createUser:
    "INSERT INTO users(user_id, username, email, name, nickname, picture) VALUES ($1, $2, $3, $4, $5, $6)",
  addConnection:
    "INSERT INTO user_connections(sender, receiver) VALUES ($1, $2)",
  removeConnection:
    "DELETE FROM user_connections WHERE ($1 = sender AND $2 = receiver) OR ($1 = receiver AND $2 = sender)",
  acceptConnection: `
    UPDATE user_connections
    SET pending = FALSE, connected = TRUE
    WHERE $1 = receiver AND $2 = sender`,
};
