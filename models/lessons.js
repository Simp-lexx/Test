export default (sequelize, DataTypes) => {
  const lessons = sequelize.define('lessons', {
    date: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {});
  lessons.associate = (models) => {
    // associations can be defined here
  };
  return lessons;
};
