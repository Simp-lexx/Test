export default (sequelize, DataTypes) => {
  const teacher = sequelize.define('teacher', {
    name: DataTypes.STRING,
  }, {
    underscored: true,
  });
  teacher.associate = (models) => {
    teacher.belongsTo(models.lesson, { through: 'lesson-teachers' });
    /* , {
      foreignKey: 'teacher_id', as: 'teacher_id',
    }); */
    // associations can be defined here
  };
  return teacher;
};
