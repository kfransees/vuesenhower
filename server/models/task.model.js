module.exports = (sequelize, Sequelize) => {
  const Task = sequelize.define('tasks', {
    quadrant: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: 0
    }
  })

  return Task
}
