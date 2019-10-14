export default (sequelize, DataTypes) => {
  const teacher = sequelize.define('teacher', {
    name: DataTypes.STRING,
  }, {
    underscored: true,
  });
  teacher.associate = (models) => {
    teacher.belongsToMany(models.lesson, {
      through: 'lesson-teacher',
      // foreignKey: 'teacher_id',
    });
    /* , {
      foreignKey: 'teacher_id', as: 'teacher_id',
    }); */
    // associations can be defined here
  };
  return teacher;
};
