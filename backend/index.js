// index.js

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db.js');
const userRoutes = require('./routes/AllRoutes.js');
const carsRoutes = require('./routes/carRoutes.js');
const AuthRoutes = require('./routes/Auth.js'); // Import the auth routes
const TestDriveRoutes = require ('./routes/testDriveRoutes.js')
const path = require('path');
const app = express();
const port = 3000;

// Connect to the database
connectDB();

// Enable CORS and allow requests from your React app's origin
// const allowedOrigins = ['http://65.0.32.220:3001', 'http://65.0.32.220:5173']; // Add more origins if needed
const allowedOrigins = ['http://13.235.69.178:3001']; // Add more origins if needed

app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, "../build")));
// Use routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carsRoutes);
app.use('/auth', AuthRoutes); // Use the auth routes
app.use('/api/testDrive', TestDriveRoutes)


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
