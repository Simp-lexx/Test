export default (sequelize, DataTypes) => {
  const lessonTeacher = sequelize.define('lesson_teacher', {
    lesson_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER,
  }, {
    underscore: true,
  });
  return lessonTeacher;
};
