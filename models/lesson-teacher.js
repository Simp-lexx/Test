export default (sequelize, DataTypes) => {
  const lessonTeacher = sequelize.define('lesson_teacher', {
    lessonId: DataTypes.INTEGER,
    teacherId: DataTypes.INTEGER,
  }, {});
  /* lessonTeacher.associate = (models) => {
    // associations can be defined here
  }; */
  return lessonTeacher;
};
