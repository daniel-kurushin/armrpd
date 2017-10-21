const bcrypt = require('bcryptjs');
const knex = require('../db/db.connection');
const localAuth = require('./local.func');

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex('users')
  .insert({
    username: req.body.username,
    password: hash,
    role: 'devrpd'
  })
  .returning('*');
}

function getUser(username) {
  return knex('users').where({username}).first();
}

function comparePass(userPassword, databasePassword) {
  const bool = bcrypt.compareSync(userPassword, databasePassword);
  if (!bool) throw new Error('bad pass silly money');
  else return true;
}

function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'Please log in'
    });
  }
  // decode the token
  const header = req.headers.authorization.split(' ');
  const token = header[1];
  localAuth.decodeToken(token, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 'Token has expired'
      });
    } else {
      return knex('users').where({id: parseInt(payload.sub)}).first()
      .then((user) => {
        req.body.username = user.username;
        req.body.role = user.role;
        next();
      })
      .catch((err) => {
        res.status(500).json({
          status: 'error'
        });
      });
    }
  });
}

module.exports = {
  createUser,
  getUser,
  comparePass,
  ensureAuthenticated
};
