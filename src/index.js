// Housing Capital NZ - Main Server File
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// API Routes (to be implemented)
app.get('/api/properties', (req, res) => {
  res.json({ message: 'Properties endpoint - to be implemented' });
});

app.get('/api/properties/:id', (req, res) => {
  res.json({ message: `Property ${req.params.id} details - to be implemented` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Housing Capital NZ server running on port ${PORT}`);
  });
}

module.exports = app;
