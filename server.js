const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware to serve static files and parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve the registration page at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'reg.html'));
});

// Serve the login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.use(express.static(path.join(__dirname, 'public')));


// Serve HTML files from the 'views' folder
app.get('/saranya.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'saranya.html'));
});

app.use(express.static('public'));


app.get('/womenWear.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'womenWear.html'));
});

app.get('/cosmetics.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'cosmetics.html'));
});

app.get('/ani.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'ani.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static('public'));


// Routes for each HTML page
app.get('/sarees.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'sarees.html'));
});
app.get('/kurti.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'kurti.html'));
});
app.get('/lehanga.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'kurti.html'));
});
app.get('/scarves.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'kurti.html'));
});

// API endpoint to handle registration
app.post('/register', (req, res) => {
    const userData = req.body;

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        let users = [];

        if (err && err.code === 'ENOENT') {
            console.log('File not found, creating a new one.');
        } else if (err) {
            return res.status(500).send({ message: 'Server error while reading file' });
        } else {
            try {
                users = JSON.parse(data);
            } catch (parseError) {
                return res.status(500).send({ message: 'Error parsing user data' });
            }
        }

        const existingUser = users.find(user => user.email === userData.email);
        if (existingUser) {
            return res.status(400).send({ message: 'Email already registered.' });
        }

        users.push(userData);

        fs.writeFile(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send({ message: 'Server error while writing file' });
            }
            res.status(200).send({ message: 'User registered successfully!' });
        });
    });
});

// API endpoint to handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    fs.readFile(path.join(__dirname, 'users.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send({ message: 'Server error while reading file' });
        }

        try {
            const users = JSON.parse(data);
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Login successful: redirect to home page
                res.redirect('/home'); // Replace with actual home page route
            } else {
                // Login failed: stay on login page with error message
                res.status(401).send({ message: 'Invalid credentials' });
            }
        } catch (parseError) {
            return res.status(500).send({ message: 'Error parsing user data' });
        }
    });
});

// Serve home page after successful login
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // Serve index.html on successful login
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
