class UserModel {
  static create(con, data, callback) {
    const { username, password } = data;

    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;

    con.query(sql, [username, password], callback);
  }

  static findOne(con, data, callback) {
    const { username } = data;

    const sql = `SELECT * FROM users WHERE username = ?`;

    con.query(sql, [username], callback);
  }
}

module.exports = UserModel;