// Desc: Main entry point for the server
// Author: Fahad Bin Mohammad Hossain (FH)

// Importing modules
const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const connection = require('./database/db');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Database Connection
connection();

// Routes
app.use(userRoute);
app.use(authRoute);

// App Start
const port = 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));
