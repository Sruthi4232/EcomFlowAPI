// Login Form Submission
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission behavior
        
        // Get values from the form fields
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Create login data object
        const loginData = {
            email: email,
            password: password,
        };

        // Send the login data to the server
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indicate that the request body contains JSON
            },
            body: JSON.stringify(loginData) // Convert the login data object to JSON
        })
        .then(response => {
            if (response.ok) {
                alert('Login Successful! Redirecting to home page...');
                window.location.href = 'index.html'; // Redirect to the home page after login
            } else {
                return response.json().then(err => {
                    alert(err.message); // Display error message from server
                });
            }
        })
        .catch(error => {
            alert('Error: ' + error.message); // Display network or other errors
        });
    });
});
