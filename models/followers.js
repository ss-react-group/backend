const {
  sequelize,
} = require('../db');


const Follower = sequelize.define('followers');


module.exports = {
  Follower,
};
