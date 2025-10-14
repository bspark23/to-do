// In-memory storage (resets on each deployment)
let db = {
  "persons": [
    {
      "id": "1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "phone": "+1234567890"
    },
    {
      "id": "2",
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "phone": "+1987654321"
    },
    {
      "id": "3",
      "name": "Bob Johnson",
      "email": "bob.johnson@example.com",
      "phone": "+1122334455"
    },
    {
      "id": "b45b",
      "name": "Blessing Mbata",
      "email": "mbatab14@gmail.com",
      "phone": "234 0905686543"
    },
    {
      "id": "10f2",
      "name": "Livingstone Mbata",
      "email": "mbatab14@gmail.com",
      "phone": "234 8098676456"
    },
    {
      "id": "f815",
      "name": "Livingstone",
      "email": "mbastone2020@gmail.com",
      "phone": "123 5486"
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
    console.log(`Persons API - Method: ${method}, URL: ${req.url}`);
    switch (method) {
      case 'GET':
        res.status(200).json(db.persons);
        break;
        
      case 'POST':
        const newPerson = await parseBody(req);
        if (!newPerson) {
          res.status(400).json({ error: 'Invalid request body' });
          return;
        }
        if (!newPerson.id) {
          newPerson.id = generateId();
        }
        db.persons.push(newPerson);
        res.status(201).json(newPerson);
        break;
        
      default:
        res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling persons request:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};