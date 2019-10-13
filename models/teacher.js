export default (sequelize, DataTypes) => {
  const teacher = sequelize.define('teacher', {
    name: DataTypes.STRING,
  }, {});
  teacher.associate = (models) => {
    teacher.hasMany(models.lesson, {
      foreignKey: 'teacher_id', as: 'teacher_id', foreignKeyConstraint: false, onDelete: 'cascade',
    });
    // associations can be defined here
  };
  return teacher;
};
