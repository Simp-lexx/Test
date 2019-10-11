export default (sequelize, DataTypes) => {
  const lesson = sequelize.define('lesson', {
    date: DataTypes.STRING,
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {});
  lesson.associate = (models) => {
    lesson.hasMany(models.teachers);
    lesson.hasMany(models.student);
    // associations can be defined here
  };
  return lesson;
};
