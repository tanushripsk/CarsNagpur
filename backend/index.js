// index.js

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db.js');
const userRoutes = require('./routes/AllRoutes.js');
const carsRoutes = require('./routes/carRoutes.js');
const AuthRoutes = require('./routes/Auth.js');
const TestDriveRoutes = require('./routes/testDriveRoutes.js');
const path = require('path');

const app = express();
const port = 3000;

// Connect to the database
connectDB();

// Allowed origins for CORS
const allowedOrigins = ['http://3.111.58.199:3001'];  // Add more origins if needed

// Enable CORS with custom configuration
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,  // Allows cookies to be sent
}));

// Middleware to parse JSON
app.use(express.json());

// Serve static files (React build folder)
app.use(express.static(path.join(__dirname, "../build")));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carsRoutes);
app.use('/auth', AuthRoutes);
app.use('/api/testDrive', TestDriveRoutes);

// Fallback for serving the React app (in production mode)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
