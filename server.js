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

// Define a route to fetch comments for an article
app.get('/api/articles/:name/comments', async (req, res) => {
  const articleName = req.params.name;
  const db = client.db('Mern_blog');
  const collection = db.collection('articles');

  try {
    const article = await collection.findOne({ name: articleName });

    // If the article doesn't exist, return an error
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Get the comments from the article
    const comments = article.comments;

    res.status(200).json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});


// Define a route to post comments to an article
app.post('/api/articles/:name/add-comments', async (req, res) => {
    const articleName = req.params.name;
    const { username, text } = req.body;
    const db = client.db('Mern_blog');
    const collection = db.collection('articles');
  
    try {
      // Find the article by name
      const article = await collection.findOne({ name: articleName });
  
      // If the article doesn't exist, return an error
      if (!article) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      // Add the comment to the article
      article.comments.push({ username, text });
  
      // Update the article in the collection
      await collection.updateOne({ name: articleName }, { $set: article });
  
      res.status(200).json({ message: 'Comment posted successfully', article });
    } catch (error) {
      console.error('Error posting comment to article:', error);
      res.status(500).json({ message: 'Error posting comment to article' });
    }
  });  

// Start the server
app.listen(PORT, () => {
  connectToMongoDB(); // Connect to MongoDB when the server starts
  console.log(`Server started on port ${PORT}`);
});
