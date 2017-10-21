const config = require('./db.config.js');
module.exports = require('knex')(config);
