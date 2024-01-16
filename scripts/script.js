document.getElementById('findForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    try {
        // Fetch data from the local JSON file
        const response = await fetch('credentials.json');
        const jsonData = await response.json();

        // Get form input values
        const accountInput = document.getElementById('account').value.toLowerCase(); // Convert to lowercase
        const emailInput = document.getElementById('email').value.toLowerCase(); // Convert to lowercase

        // Find the user in the JSON data (case-insensitive search)
        const user = jsonData.find(entry => entry.account.toLowerCase() === accountInput && entry.emailId.toLowerCase() === emailInput);

        // Display results or show an alert
        const resultsElement = document.getElementById('findResults');
        if (user) {
            resultsElement.innerHTML = `User: ${user.userId}<br>Password: ${user.password}`;
        } else {
            resultsElement.innerHTML = 'User not found';
        }
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
});

// for Credential Form 

document.getElementById('credentialForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Extract form data
    const account = document.getElementById('account').value;
    const userId = document.getElementById('userId').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create an object with user credentials
    const userCredentials = { account, userId, email, password };

    // Retrieve existing credentials from Local Storage (if any)
    let existingCredentials = JSON.parse(localStorage.getItem('credentials')) || [];

    // Add new credentials to the existing ones
    existingCredentials.push(userCredentials);

    // Save updated credentials to Local Storage
    localStorage.setItem('credentials', JSON.stringify(existingCredentials));

    // Notify the user (you may want to display a message on the page)
    console.log('Credentials saved successfully!');
});
