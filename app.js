const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve your HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Handle form submission
app.post('/submit_form', (req, res) => {
  // Extract user credentials from the form submission
  const { account, userId, email, password } = req.body;

  // Create an object with user credentials
  const userCredentials = { account, userId, email, password };

  // Read existing credentials from the file (if any)
  let existingCredentials = [];
  try {
    const data = fs.readFileSync('credentials.json');
    existingCredentials = JSON.parse(data);
  } catch (error) {
    // File may not exist yet, that's okay
  }

  // Add new credentials to the existing ones
  existingCredentials.push(userCredentials);

  // Write the updated credentials back to the file
  fs.writeFileSync('credentials.json', JSON.stringify(existingCredentials, null, 2));

  // Send a response to the user
  res.send('Credentials saved successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
