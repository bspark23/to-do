// In-memory storage (resets on each deployment)
let db = {
  "tasks": [
    {
      "id": "1",
      "title": "Create Angular Components",
      "person": {
        "id": "1",
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "+1234567890"
      },
      "startDate": "2024-01-15T00:00:00.000Z",
      "endDate": "2025-10-14T08:33:51.464Z",
      "priority": "Difficile",
      "labels": [
        "HTML",
        "CSS",
        "NODE JS"
      ],
      "description": "Develop reusable Angular components for the application",
      "completed": true
    },
    {
      "id": "2",
      "title": "Setup Database Schema",
      "person": {
        "id": "2",
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "phone": "+1987654321"
      },
      "startDate": "2024-01-10T00:00:00.000Z",
      "endDate": "2024-01-20T00:00:00.000Z",
      "priority": "Difficile",
      "labels": [
        "NODE JS"
      ],
      "description": "Design and implement the database schema for the project",
      "completed": true
    },
    {
      "id": "3",
      "title": "Implement User Interface",
      "person": {
        "id": "3",
        "name": "Bob Johnson",
        "email": "bob.johnson@example.com",
        "phone": "+1122334455"
      },
      "startDate": "2024-01-20T00:00:00.000Z",
      "endDate": null,
      "priority": "Facile",
      "labels": [
        "HTML",
        "CSS",
        "JQUERY"
      ],
      "description": "Create responsive user interface with modern design",
      "completed": false
    },
    {
      "id": "4f5f",
      "title": "creaTE TODA",
      "person": {
        "id": "b45b",
        "name": "Blessing Mbata",
        "email": "mbatab14@gmail.com",
        "phone": "234 0905686543"
      },
      "startDate": "2025-10-16T03:00:00.000Z",
      "endDate": "2025-10-23T03:00:00.000Z",
      "priority": "Moyen",
      "labels": [
        "HTML",
        "CSS",
        "NODE JS"
      ],
      "description": "CREATE IT TODAY",
      "completed": false
    },
    {
      "id": "0f27",
      "title": "bbdjyrtdc",
      "person": {
        "id": "10f2",
        "name": "Livingstone Mbata",
        "email": "mbatab14@gmail.com",
        "phone": "234 8098676456"
      },
      "startDate": "2025-10-14T09:42:46.132Z",
      "priority": "Moyen",
      "labels": [
        "NODE JS"
      ],
      "description": "ho",
      "completed": false
    },
    {
      "id": "f39e",
      "title": "my qwe",
      "person": {
        "id": "f815",
        "name": "Livingstone",
        "email": "mbastone2020@gmail.com",
        "phone": "123 5486"
      },
      "startDate": "2025-10-14T09:44:04.127Z",
      "endDate": "2025-10-14T09:44:26.474Z",
      "priority": "Moyen",
      "labels": [],
      "description": "bhje5rh",
      "completed": true
    },
    {
      "id": "9661",
      "title": "my self",
      "person": {
        "id": "3",
        "name": "Bob Johnson",
        "email": "bob.johnson@example.com",
        "phone": "+1122334455"
      },
      "startDate": "2025-10-14T11:01:22.387Z",
      "endDate": "2025-10-14T11:01:48.441Z",
      "priority": "Facile",
      "labels": [
        "HTML"
      ],
      "description": "ghrkfdmlaszmdc;mslkfbvksefmcmncfcwdm;fmlm",
      "completed": false
    }
  ]
};

// Helper function to generate ID
function generateId() {
  return Math.random().toString(36).substring(2, 6);
}

// CORS headers
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

// Parse request body
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : null);
      } catch (error) {
        resolve(null);
      }
    });
  });
}

module.exports = async (req, res) => {
  try {
    setCorsHeaders(res);
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const method = req.method;
    console.log(`Tasks API - Method: ${method}, URL: ${req.url}`);
    switch (method) {
      case 'GET':
        res.status(200).json(db.tasks);
        break;
        
      case 'POST':
        const newTask = await parseBody(req);
        if (!newTask) {
          res.status(400).json({ error: 'Invalid request body' });
          return;
        }
        if (!newTask.id) {
          newTask.id = generateId();
        }
        db.tasks.push(newTask);
        res.status(201).json(newTask);
        break;
        
      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling tasks request:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};