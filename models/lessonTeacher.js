export default (sequelize, DataTypes) => {
  const lessonTeacher = sequelize.define('lesson_teacher', {
    lesson_id: DataTypes.INTEGER,
    teacher_id: DataTypes.INTEGER,
  }, {
    underscore: true,
  });
  /* lessonTeacher.associate = (models) => {
    // associations can be defined here
  }; */
  return lessonTeacher;
};
