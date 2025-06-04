import express from "express";
import cors from "cors";
import dotenv from "dotenv";

console.log("Starting application...");
dotenv.config();

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  console.log("Health check called");
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      DB_HOST: process.env.DB_HOST ? 'SET' : 'NOT SET'
    }
  });
});

// Basic route
app.get('/', (req, res) => {
  console.log("Root endpoint called");
  res.json({ message: 'Backend is running!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error occurred:', err);
  res.status(500).json({ error: err.message });
});

const port = process.env.PORT || 8080;

console.log(`Attempting to start server on port ${port}`);

app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server successfully running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('Server is ready to accept connections');
}).on('error', (err) => {
  console.error('❌ Server failed to start:', err);
  process.exit(1);
});
