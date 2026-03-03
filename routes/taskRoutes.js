const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const { validateCreateTask, validateUpdateTask, validateTaskId } = require('../validators/taskValidators');

// CRUD routes
router.get('/', tasksController.getAllTasks);
router.get('/:id', validateTaskId, tasksController.getTaskById);
router.post('/', validateCreateTask, tasksController.createTask);
router.put('/:id', validateTaskId, validateUpdateTask, tasksController.updateTask);
router.delete('/:id', validateTaskId, tasksController.deleteTask);

module.exports = router;