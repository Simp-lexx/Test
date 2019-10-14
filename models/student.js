export default (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    name: DataTypes.STRING,
  }, {});
  student.associate = (models) => {
    /* student.hasMany(models.lesson, {
      foreignKey: 'student_id', as: 'student_id',
    }); */
    // associations can be defined here
  };
  return student;
};
