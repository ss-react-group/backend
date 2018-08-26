const Sequelize = require('sequelize');

const sequelize = new Sequelize('m1314_react', 'm1314_react', 'zaq1@WSXPDt2k4o9', {
  host: 'mysql16.mydevil.net',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 100,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = {
  sequelize,
};
