export default (sequelize, DataTypes) => {
  const teacher = sequelize.define('teacher', {
    name: DataTypes.STRING,
  }, {
    underscored: true,
  });
  teacher.associate = (models) => {
    teacher.belongsToMany(models.lesson, {
      through: 'lesson_teacher',
      foreignKey: 'teacher_id',
    });
  };
  return teacher;
};
