export default (sequelize, DataTypes) => {
  const lesson = sequelize.define('lesson', {
    date: DataTypes.DATE,
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {});
  lesson.associate = (models) => {
    lesson.belongsToMany(models.teacher, { through: 'lesson-teacher' });
    lesson.belongsToMany(models.student, { through: 'lesson-student' });
    // associations can be defined here
  };
  return lesson;
};
