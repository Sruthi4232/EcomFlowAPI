document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('register-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error messages
        const errorMessage = document.querySelectorAll('.error');
        errorMessage.forEach(function(msg) {
            msg.remove();
        });

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phoneno = document.getElementById('phoneno').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate form inputs
        let isValid = true;

        // Name validation
        if (name.trim() === "") {
            showError('name', 'Name is required.');
            isValid = false;
        }

        // Email validation (simple regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Enter a valid email.');
            isValid = false;
        }

        // Phone number validation (length)
        if (phoneno.length !== 10) {
            showError('phoneno', 'Phone number must be 10 digits.');
            isValid = false;
        }

        // Password validation
        if (password.length < 6) {
            showError('password', 'Password must be at least 6 characters.');
            isValid = false;
        }

        // Confirm password validation
        if (password !== confirmPassword) {
            showError('confirm-password', 'Passwords do not match.');
            isValid = false;
        }

        // If the form is valid, send data to the server
        if (isValid) {
            const userData = {
                name: name,
                email: email,
                phoneno: phoneno,
                password: password
            };

            // Send data to the server using fetch
            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);  // Display success message
                window.location.href = 'login.html';  // Redirect to login page
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    });

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.createElement('div');
        errorElement.className = 'error';
        errorElement.innerText = message;
        field.parentElement.appendChild(errorElement);
    }
});
