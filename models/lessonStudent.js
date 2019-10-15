export default (sequelize, DataTypes) => {
  const lessonStudent = sequelize.define('lesson_student', {
    lesson_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    visit: DataTypes.BOOLEAN,
  }, {
    underscore: true,
  });
  return lessonStudent;
};
