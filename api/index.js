const express = require('express');
const taskRoutes = require('../routes/taskRoutes');
const { errorHandler, notFoundHandler } = require('../middlewares/errorHandler');
const setupSwagger = require('../docs/swaggerSetup');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Task Management API',
    documentation: '/api-docs',
    version: '1.0.0',
    endpoints: {
      tasks: '/api/tasks'
    }
  });
});

// Swagger
setupSwagger(app);

app.use('/api/tasks', taskRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;