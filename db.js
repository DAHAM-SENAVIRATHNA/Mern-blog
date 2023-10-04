const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file to get mongodb user 

const dbUrI = process.env.mongoUrI;

// Connect to MongoDB
mongoose.connect(dbUrI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Export the mongoose object to be used in other parts of the application
module.exports = mongoose;;
