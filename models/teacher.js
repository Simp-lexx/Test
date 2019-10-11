export default (sequelize, DataTypes) => {
  const teacher = sequelize.define('teacher', {
    name: DataTypes.STRING,
  }, {});
  teacher.associate = (models) => {
    teacher.belongsTo(models.lesson);
    // associations can be defined here
  };
  return teacher;
};
