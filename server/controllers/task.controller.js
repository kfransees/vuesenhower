const db = require('../models')
const Task = db.task

exports.createTask = async (req, res) => {
  return await Task.create({
    quadrant: req.body.quadrant,
    category: req.body.category,
    description: req.body.description,
    userId: req.body.user
  })
    .then((task) => {
      res.status(200).send({
        task: task,
        message: 'The task was successfully saved!'
      })
      return task
    })
    .catch((err) => {
      res.status(500).send({
        message: `Can't save your task at this moment. Try again later.`
      })
    })
}

exports.deleteTask = async (req, res) => {
  return await Task.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.status(200).send({
        message: `The task was successfully removed.`
      })
    })
    .catch(() => {
      res.status(500).send({
        message: `Can't delete the task at this moment. Try reloading the page.`
      })
    })
}

exports.getAllTasks = async (req, res) => {
  return await Task.findAll({
    where: {
      userId: req.params.id
    }
  }).then((tasks) => {
    const allTasks = {
      do_first: tasks.filter((x) => x.quadrant === 'Do First'),
      schedule: tasks.filter((x) => x.quadrant === 'Schedule'),
      delegate: tasks.filter((x) => x.quadrant === 'Delegate'),
      eliminate: tasks.filter((x) => x.quadrant === 'Eliminate')
    }
    res.status(200).send({
      tasks: allTasks
    })
  })
}

exports.updateTaskCompleted = async (req, res) => {
  return await Task.update(
    { isCompleted: req.body.isCompleted },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then((isCompleted) =>
      res.status(200).send({
        isCompleted: req.body.isCompleted,
        message: req.body.isCompleted
          ? 'One task down!'
          : 'The task has been re-activated!'
      })
    )
    .catch(() => {
      res.status(500).send({
        message: `Can't update the task at this moment. Try reloading the page.`
      })
    })
}

exports.deleteTasks = async (req, res) => {
  return await Task.destroy({
    where: {
      userId: req.params.id,
      quadrant: req.body.quadrant
    }
  })
    .then(() => {
      res.status(200).send({
        message: `The quadrant was successfully cleared.`
      })
    })
    .catch(() => {
      res.status(500).send({
        message: `Can't delete the tasks at this moment. Try reloading the page.`
      })
    })
}
