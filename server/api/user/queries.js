const getUser = "SELECT * FROM students WHERE id = $1";

module.exports = {
  getUser,
};
