const { pool } = require('../db');
const { userSchema } = require('../validators/userValidator');

async function getAllUsers(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM Users');
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getUserById(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM Users WHERE Id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const { error, value } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, phone, company, street, city, zipcode, geo } = value;
    const [result] = await pool.query(
      `INSERT INTO Users (Name, Email, Phone, Company, Street, City, Zipcode, Geo_Lat, Geo_Lng)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, company, street, city, zipcode, geo.lat, geo.lng]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { error, value } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, phone, company, street, city, zipcode, geo } = value;
    const [result] = await pool.query(
      `UPDATE Users SET Name=?, Email=?, Phone=?, Company=?, Street=?, City=?, Zipcode=?, Geo_Lat=?, Geo_Lng=? WHERE Id=?`,
      [name, email, phone, company, street, city, zipcode, geo.lat, geo.lng, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User updated' });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM Users WHERE Id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };