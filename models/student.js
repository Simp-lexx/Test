export default (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    name: DataTypes.STRING,
  }, {
    underscore: true,
  });
  student.associate = (models) => {
    student.belongsToMany(models.lesson, {
      through: 'lesson_student',
    });
  };
  return student;
};
