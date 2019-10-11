export default (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    name: DataTypes.STRING,
  }, {});
  student.associate = (models) => {
    student.belongsTo(models.lesson);
    // associations can be defined here
  };
  return student;
};
