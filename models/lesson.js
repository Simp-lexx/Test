import Sequelize from 'sequelize';

export default (sequelize, DataTypes) => {
  const { Op } = Sequelize;
  const lesson = sequelize.define('lesson', {
    date: DataTypes.DATEONLY,
    title: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, {
    underscored: true,
    scopes: {
      date: dates => ({
        where: {
          date: {
            [Op.between]: dates,
          },
        },
      }),
      status: statusId => ({
        where: {
          status: {
            [Op.eq]: statusId,
          },
        },
      }),
    },
  });
  lesson.associate = (models) => {
    lesson.belongsToMany(models.teacher, {
      through: 'lesson_teacher',
      foreignKey: 'lesson_id',
    });
    lesson.belongsToMany(models.student, {
      through: 'lesson_student',
      foreignKey: 'lesson_id',
    });
    lesson.addScope('teacherIds', teacherIds => ({
      include: [{
        model: models.teacher,
        where: {
          id: {
            [Op.in]: teacherIds,
          },
        },
      }],
    }));
    lesson.addScope('studentsCount', count => ({
      include: [{
        model: models.student,
        where: sequelize.where(sequelize.fn('COUNT', sequelize.col('student_id')), {
          [Op.between]: count
        }),
      }],
    }));
  };
  return lesson;
};
