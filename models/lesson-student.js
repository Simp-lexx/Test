export default (sequelize, DataTypes) => {
  const lessonStudents = sequelize.define('lesson_student', {
    lesson_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER,
    visit: DataTypes.BOOLEAN,
  }, {
    underscore: true,
  });
  /* lessonStudents.associate = (models) => {
    // associations can be defined here
  }; */
  return lessonStudents;
};
