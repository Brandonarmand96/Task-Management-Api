const express = require('express');


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


module.exports = app;