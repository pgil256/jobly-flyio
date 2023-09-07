const knex = require('knex');
const knexfile = require('./knexfile');

const env = process.env.NODE_ENV || 'production';
const configOptions = knexfile[env];

const db = knex(configOptions);

module.exports = db;