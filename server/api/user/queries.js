module.exports = {
  getUserById: "SELECT * FROM users WHERE user_id = $1",
  getUserByUsername: "SELECT * FROM users WHERE username = $1",
  createUser:
    "INSERT INTO users(user_id, username, email, name, nickname, picture) VALUES ($1, $2, $3, $4, $5, $6)",
};
