'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teachers = sequelize.define('Teachers', {
    name: DataTypes.STRING
  }, {});
  Teachers.associate = function(models) {
    // associations can be defined here
  };
  return Teachers;
};