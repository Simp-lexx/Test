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
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('lesson_teachers'),
};
