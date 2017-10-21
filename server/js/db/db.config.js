// const databaseName = 'arm-rpd';
const databaseName = 'dbarm';

module.exports = {
  client: 'postgresql',
  connection: `postgres://192.168.0.10:5432/${databaseName}`
};
