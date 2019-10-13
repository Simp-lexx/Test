module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('lesson_teachers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    lessonId: {
      type: Sequelize.INTEGER,
    },
    teacherId: {
      type: Sequelize.INTEGER,
    },
  }),
  down: queryInterface => queryInterface.dropTable('lesson_teachers'),
};
