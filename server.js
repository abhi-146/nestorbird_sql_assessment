const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const PORT = 3000;
const client = new Client({
  connectionString: 'postgresql://zain:pass@localhost:5432/nestorbird'
});

app.use(cors());
app.use(bodyParser.json());
client.connect();

// API endpoint to fetch all questions
app.get('/questions', async (req, res) => {
  try {
    const { rows } = await client.query('SELECT id, question_text, options FROM questions');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to store responses
app.post('/responses', async (req, res) => {
  try {
    console.log(req.body)
    const { response } = req.body.requestBody;
    const query = `
      INSERT INTO responses (user_response)
      VALUES ($1)
    `;
    await client.query(query, [response]);
    res.status(201).json({ message: 'Response stored successfully' });
  } catch (error) {
    console.error('Error storing response:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/questions/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM questions WHERE id = $1;`;
    const { rows } = await client.query(query, [id]);
    if (rows.length > 0) {
      res.json(rows[0]); // Sending back the first matching question
    } else {
      res.status(404).json({ error: 'Question not found in else' });
    }
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function dropTablesIfExists() {
  const queries = [
    'DROP TABLE IF EXISTS responses',
    'DROP TABLE IF EXISTS questions'
  ];

  try {
    for (const query of queries) {
      await client.query(query);
    }
    console.log('Tables dropped successfully if they exist');
  } catch (error) {
    console.error('Error executing drop queries:', error);
  }
}


// Function to create tables
async function createTables() {
  const queries = [
    `
      CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        question_text TEXT,
        options JSONB
      )
    `,
    `
      CREATE TABLE IF NOT EXISTS responses (
        id SERIAL PRIMARY KEY,
        user_response TEXT
      )
    `
  ];

  try {
    for (const query of queries) {
      await client.query(query);
    }
    console.log('Tables created successfully or already exist');
  } catch (error) {
    console.error('Error executing queries:', error);
  }
}


async function addData() {
  const queries = [
    `INSERT INTO questions (id, question_text, options) VALUES
    (
      'FIR',
      'Select one?',
      '[ 
        {"id": "javascript", "text": "Javascript"},
        {"id": "Express", "text": "Express"},
        {"id": "Node", "text": "Node"},
        {"id": "React", "text": "React"}
      ]'::jsonb
    )`,
    `INSERT INTO questions (id, question_text, options) VALUES
    (
      'javascript',
      'What is the difference between == and === operators in JavaScript?',
      '[
        {"id": "submit-A", "text": "== compares the values whereas === compares both values and types."},
        {"id": "submit-B", "text": "== is used to assign values whereas === is used to compare values."},
        {"id": "submit-C", "text": "== is used for arithmetic operations whereas === is used for string concatenation."},
        {"id": "submit-D", "text": "== is deprecated and === is the recommended way for comparisons in JavaScript."}
      ]'::jsonb
    )`,
    `INSERT INTO questions (id, question_text, options) VALUES
    (
      'Express',
      'What does middleware do in Express.js?',
      '[
        {"id": "submit-A", "text": "Middleware is used for defining routes in Express applications."},
        {"id": "submit-B", "text": "Middleware is used for handling HTTP requests and responses."},
        {"id": "submit-C", "text": "Middleware is used for managing sessions and authentication."},
        {"id": "submit-D", "text": "Middleware is used for connecting to databases and performing CRUD operations."}
      ]'::jsonb
    )`,
    `INSERT INTO questions (id, question_text, options) VALUES
    (
      'Node',
      'What is the purpose of the package.json file in Node.js projects?',
      '[
        {"id": submit-A", "text": "To store metadata about the project and manage dependencies."},
        {"id": submit-B", "text": "To define the structure of the project folders and files."},
        {"id": submit-C", "text": "To specify the version of Node.js required for the project."},
        {"id": submit-D", "text": "To define the project build settings and scripts."}
      ]'::jsonb
    )`,
    `INSERT INTO questions (id, question_text, options) VALUES
    (
      'React',
      'What is the purpose of the useReducer hook in React?',
      '[
        {"id":submit-A", "text": "To manage complex state logic in functional components."},
        {"id":submit-B", "text": "To fetch data from an API and update the component state."},
        {"id":submit-C", "text": "To handle routing and navigation in React applications."},
        {"id":submit-D", "text": "To define and manage global application state across multiple components."}
      ]'::jsonb
    )`
  ];
  

  try {
    for (const query of queries) {
      await client.query(query);
    }
    console.log('Data added ');
  } catch (error) {
    console.error('Error executing queries:', error);
  }
}

async function initializeDatabase() {
  try {
    await dropTablesIfExists();
    await createTables();
    await addData();
    console.log('Database initialization complete');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Call the initialization function to start the process
initializeDatabase();
