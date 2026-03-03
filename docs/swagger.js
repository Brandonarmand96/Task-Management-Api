// docs/swagger.js

const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Tasks API',
    version: '1.0.0',
    description: 'API for managing tasks using Supabase and Node.js',
  },
  servers: [{ url: 'http://localhost:3000', description: 'Local server' }],
  components: {
    schemas: {
      Task: {
        type: 'object',
        properties: {
          id: { type: 'string', format: 'uuid' },
          title: { type: 'string' },
          description: { type: 'string' },
          status: { type: 'string', enum: ['pending', 'in_progress', 'completed'] },
          priority: { type: 'string', enum: ['low', 'medium', 'high'] },
          created_at: { type: 'string', format: 'date-time' },
          updated_at: { type: 'string', format: 'date-time' },
        },
      },
      CreateTaskRequest: {
        type: 'object',
        required: ['title'],
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          status: { type: 'string', enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
          priority: { type: 'string', enum: ['low', 'medium', 'high'], default: 'medium' },
        },
      },
      UpdateTaskRequest: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          description: { type: 'string' },
          status: { type: 'string', enum: ['pending', 'in_progress', 'completed'] },
          priority: { type: 'string', enum: ['low', 'medium', 'high'] },
        },
      },
      Error: {
        type: 'object',
        properties: {
          error: { type: 'string' },
          message: { type: 'string' },
          details: { type: 'array', items: { type: 'object', properties: { field: { type: 'string' }, message: { type: 'string' } } } },
        },
      },
    },
  },
  paths: {
    '/api/tasks': {
      get: {
        summary: 'Get all tasks',
        tags: ['Tasks'],
        responses: {
          200: {
            description: 'List of tasks',
            content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { type: 'array', items: { $ref: '#/components/schemas/Task' } }, count: { type: 'integer' } } } } },
          },
          500: { description: 'Internal server error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      post: {
        summary: 'Create a new task',
        tags: ['Tasks'],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/CreateTaskRequest' } } } },
        responses: {
          201: { description: 'Task created', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { $ref: '#/components/schemas/Task' } } } } } },
          400: { description: 'Validation error', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
    '/api/tasks/{id}': {
      get: {
        summary: 'Get a task by ID',
        tags: ['Tasks'],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          200: { description: 'Task found', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { $ref: '#/components/schemas/Task' } } } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      put: {
        summary: 'Update a task',
        tags: ['Tasks'],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string', format: 'uuid' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UpdateTaskRequest' } } } },
        responses: {
          200: { description: 'Task updated', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, data: { $ref: '#/components/schemas/Task' } } } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
      delete: {
        summary: 'Delete a task',
        tags: ['Tasks'],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string', format: 'uuid' } }],
        responses: {
          200: { description: 'Deleted successfully', content: { 'application/json': { schema: { type: 'object', properties: { success: { type: 'boolean' }, message: { type: 'string' } } } } } },
          404: { description: 'Not found', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } },
        },
      },
    },
  },
};

module.exports = swaggerDocument;