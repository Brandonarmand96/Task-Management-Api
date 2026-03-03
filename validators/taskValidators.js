const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 1 character long',
    'string.max': 'Title must not exceed 200 characters',
    'any.required': 'Title is required'
  }),
  description: Joi.string().max(1000).optional().allow('').messages({
    'string.max': 'Description must not exceed 1000 characters'
  }),
  status: Joi.string().valid('pending', 'in_progress', 'completed').optional().messages({
    'any.only': 'Status must be one of: pending, in_progress, completed'
  }),
  priority: Joi.string().valid('low', 'medium', 'high').optional().messages({
    'any.only': 'Priority must be one of: low, medium, high'
  })
});

const updateTaskSchema = Joi.object({
  title: Joi.string().min(1).max(200).optional().messages({
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title must be at least 1 character long',
    'string.max': 'Title must not exceed 200 characters'
  }),
  description: Joi.string().max(1000).optional().allow('').messages({
    'string.max': 'Description must not exceed 1000 characters'
  }),
  status: Joi.string().valid('pending', 'in_progress', 'completed').optional().messages({
    'any.only': 'Status must be one of: pending, in_progress, completed'
  }),
  priority: Joi.string().valid('low', 'medium', 'high').optional().messages({
    'any.only': 'Priority must be one of: low, medium, high'
  })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

const uuidSchema = Joi.string().uuid().required().messages({
  'string.guid': 'Invalid task ID format',
  'any.required': 'Task ID is required'
});

const validateCreateTask = (req, res, next) => {
  const { error } = createTaskSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }
  next();
};

const validateUpdateTask = (req, res, next) => {
  const { error } = updateTaskSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      details: error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }
  next();
};

const validateTaskId = (req, res, next) => {
  const { error } = uuidSchema.validate(req.params.id);
  if (error) {
    return res.status(400).json({
      error: 'Validation Error',
      details: [{ field: 'id', message: error.details[0].message }]
    });
  }
  next();
};

module.exports = {
  validateCreateTask,
  validateUpdateTask,
  validateTaskId
};
