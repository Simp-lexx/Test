export default (sequelize, DataTypes) => {
  const lesson = sequelize.define('lesson', {
    date: DataTypes.DATE,
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    underscored: true,
  });
  lesson.associate = (models) => {
    lesson.belongsToMany(models.teacher, {
      through: 'lesson_teacher',
    });
    lesson.belongsToMany(models.student, {
      through: 'lesson_student',
    });
  };
  return lesson;
};
