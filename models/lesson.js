export default (sequelize, DataTypes) => {
  const lesson = sequelize.define('lesson', {
    date: DataTypes.DATE,
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    underscored: true,
  });
  lesson.associate = (models) => {
    lesson.hasMany(models.teacher);
    // lesson.belongsToMany(models.student, { through: 'lesson-student' });
    // associations can be defined here
  };
  return lesson;
};
