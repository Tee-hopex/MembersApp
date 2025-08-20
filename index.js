const express = require('express');

// dotenv configuration
require('dotenv').config();

// Database connection
const connectDB = require('./db.js')

connectDB(); // Connect to MongoDB

const app = express();  
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// middleware to link routes
app.use("/members", require("./routes/members"));

app.listen(PORT, () => {console.log(`Server is running on port http://localhost:${PORT}`)});