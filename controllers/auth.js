import { db } from '../connect.js';
import bcrypt from 'bcryptjs';

//Register new user
export const register = (req, res) => {
  //Check if the user exists
  const q = 'SELECT * FROM users WHERE username = ?';

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json('User already exists!');
    //Create a new user
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q =
      'INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)';

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json('User has been created.');
    });
  });
};

//Login user
export const login = (req, res) => {
  const q = 'SELECT * FROM users WHERE username = ?';

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json('User not found!');

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json('Wrong password or username!');

    const { password, ...others } = data[0];

    res.status(200).json(others);
  });
};

//Update user
export const update = (req, res) => {
  //Check if the user exists
  const q = `SELECT * FROM users WHERE username = ?`;

  db.query(q, [req.body.username], function (error, results, fields) {
    console.log(req.body.username);
    if (error) throw error;
    res.send(results);
    console.log(results);
  });
};

//Logout User
export const logout = (req, res) => {
  res.status(200).json('User has been logged out.');
};

//Submit to the db the playlist type preferences chosen by users.
export const addEmotions = (req, res) => {
  const q =
    'UPDATE users SET `sad` = ?,`happy` = ?,`angry` = ?,`neutral` = ?,`fearful` = ?,`surprised`= ? ,`disgusted` = ? WHERE `username` = ? ';

  const values = [
    req.body.sad,
    req.body.happy,
    req.body.angry,
    req.body.neutral,
    req.body.fearful,
    req.body.surprised,
    req.body.disgusted,
    req.body.username,
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      res.status(500).send({ err });
    } else {
      res.status(200).json('Record updated successfully');
    }
  });
};
