module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('lesson_students', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    lessonId: {
      type: Sequelize.INTEGER,
    },
    studentId: {
      type: Sequelize.INTEGER,
    },
    visit: {
      type: Sequelize.BOOLEAN,
    },
  }),
  down: queryInterface => queryInterface.dropTable('lesson_students'),
};
