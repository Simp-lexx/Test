export default (sequelize, DataTypes) => {
  const lessonStudents = sequelize.define('lesson_students', {
    lessonId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    visit: DataTypes.BOOLEAN,
  }, {});
  lessonStudents.associate = (models) => {
    // associations can be defined here
  };
  return lessonStudents;
};
