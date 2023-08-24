const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3053;

app.use(cors());
app.use(express.json());

// Simulated database for email usernames
const emailUsernames = [];

// Create Email Username
app.post('/emails', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Both username and password are required.' });
  }

  // Check if the username already exists
  if (emailUsernames.some(user => user.username === username)) {
    return res.status(409).json({ message: 'Username already exists.' });
  }

  emailUsernames.push({ username, password });

  res.status(201).json({ message: 'Email username created successfully.' });
});

// List Email Usernames
app.get('/emails', (req, res) => {
  const usernames = emailUsernames.map(user => ({ username: user.username }));
  res.json(usernames);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
