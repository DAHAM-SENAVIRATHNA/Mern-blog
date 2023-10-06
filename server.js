// Import dependencies
const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

// Define a route to retrieve data from MongoDB
app.get('/api/articles/:name', async (req, res) => {
  const articleName = req.params.name;

  const db = client.db('Mern_blog');
  const collection = db.collection('articles');

  try {
    const articleInfo = await collection.findOne({ name: articleName });
    res.status(200).json(articleInfo);
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
    res.status(500).json({ message: 'Error retrieving data from MongoDB' });
  }
});

// Start the server
app.listen(PORT, () => {
  connectToMongoDB(); // Connect to MongoDB when the server starts
  console.log(`Server started on port ${PORT}`);
});
