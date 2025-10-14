module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    message: 'Angular TODO Mock API',
    endpoints: [
      'GET /api/persons - Get all persons',
      'POST /api/persons - Create person',
      'GET /api/persons/[id] - Get person by ID',
      'PUT /api/persons/[id] - Update person',
      'DELETE /api/persons/[id] - Delete person',
      'GET /api/tasks - Get all tasks',
      'POST /api/tasks - Create task',
      'GET /api/tasks/[id] - Get task by ID',
      'PUT /api/tasks/[id] - Update task',
      'DELETE /api/tasks/[id] - Delete task'
    ],
    version: '1.0.0',
    status: 'API is working!'
  });
};