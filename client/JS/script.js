document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

const showLogin = () => {
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');

    // Show login form and hide register form
    loginContainer.style.display = 'block';
    registerContainer.style.display = 'none';

    // Clear and hide error messages and success messages in login form
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    clearErrorMessages('login');
    document.getElementById('login-success').textContent = '';
    document.getElementById('login-success').style.display = 'none'; // Hide success message
}

const showRegister = () => {
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');

    // Show register form and hide login form
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';

    // Clear and hide error messages and success messages in register form
    document.getElementById('register-username').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-confirm-password').value = '';
    document.getElementById('register-role').selectedIndex = 0; // Reset to default option
    clearErrorMessages('register');
    document.getElementById('register-success').textContent = ''; // Clear success message
    document.getElementById('register-success').style.display = 'none'; // Hide success message
}

// Clear error messages
const clearErrorMessages = (formType) => {
    const errorIds = {
        login: ['login-email-error', 'login-password-error'],
        register: ['register-username-error', 'register-email-error', 'register-password-error', 'register-confirm-password-error', 'register-role-error']
    };

    errorIds[formType].forEach(id => {
        const errorElement = document.getElementById(id);
        errorElement.textContent = '';
        errorElement.classList.remove('visible');
    });
}

// Handle login
document.getElementById('loginContainer').querySelector('form').addEventListener('submit', (event) => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Clear previous error messages
    clearErrorMessages('login');
    document.getElementById('login-success').textContent = '';
    document.getElementById('login-success').style.display = 'none'; // Hide success message

    // Find the user with the provided email
    const user = users.find(user => user.email === email);

    // Validate email format
    if (!validateEmail(email)) {
        const emailError = document.getElementById('login-email-error');
        emailError.textContent = 'Invalid email format.';
        emailError.classList.add('visible'); // Show error message
        event.preventDefault(); // Prevent form submission
        return;
    }

    // Check if the email exists and the password matches
    if (!user) {
        const emailError = document.getElementById('login-email-error');
        emailError.textContent = 'Invalid email or password.';
        emailError.classList.add('visible'); // Show error message
        event.preventDefault(); // Prevent form submission
    } else if (user.password !== password) {
        const passwordError = document.getElementById('login-password-error');
        passwordError.textContent = 'Invalid email or password.';
        passwordError.classList.add('visible'); // Show error message
        event.preventDefault(); // Prevent form submission
    } else {
        // Clear previous error messages and display success message
        clearErrorMessages('login');
        const successMessage = document.getElementById('login-success');
        successMessage.textContent = 'Login successful!';
        successMessage.style.color = 'green';
        successMessage.style.display = 'block'; // Show success message
    }
});

// Handle registration
document.getElementById('registerContainer').querySelector('form').addEventListener('submit', (event) => {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const role = document.getElementById('register-role').value;

    // Clear previous error messages
    clearErrorMessages('register');

    // Simple validation
    let isValid = true;

    if (password !== confirmPassword) {
        const confirmPasswordError = document.getElementById('register-confirm-password-error');
        confirmPasswordError.textContent = 'Passwords do not match.';
        confirmPasswordError.classList.add('visible'); // Show error message
        isValid = false;
    }

    // Check if all fields are filled out
    if (!username) {
        const usernameError = document.getElementById('register-username-error');
        usernameError.textContent = 'Username is required.';
        usernameError.classList.add('visible'); // Show error message
        isValid = false;
    }
    if (!email) {
        const emailError = document.getElementById('register-email-error');
        emailError.textContent = 'Email is required.';
        emailError.classList.add('visible'); // Show error message
        isValid = false;
    }
    if (!validateEmail(email)) {
        const emailError = document.getElementById('register-email-error');
        emailError.textContent = 'Invalid email format.';
        emailError.classList.add('visible'); // Show error message
        isValid = false;
    }
    if (!password) {
        const passwordError = document.getElementById('register-password-error');
        passwordError.textContent = 'Password is required.';
        passwordError.classList.add('visible'); // Show error message
        isValid = false;
    }
    if (!confirmPassword) {
        const confirmPasswordError = document.getElementById('register-confirm-password-error');
        confirmPasswordError.textContent = 'Please confirm your password.';
        confirmPasswordError.classList.add('visible'); // Show error message
        isValid = false;
    }
    if (!role) {
        const roleError = document.getElementById('register-role-error');
        roleError.textContent = 'Please select a role.';
        roleError.classList.add('visible'); // Show error message
        isValid = false;
    }

    if (!isValid) {
        // Prevent default form submission behavior
        event.preventDefault();
        return;
    }

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the email is already registered
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        const emailError = document.getElementById('register-email-error');
        emailError.textContent = 'Email already registered.';
        emailError.classList.add('visible'); // Show error message
        // Prevent default form submission behavior
        event.preventDefault();
        return;
    }

    // Add new user
    users.push({ username, email, password, role });
    localStorage.setItem('users', JSON.stringify(users));

    const successMessage = document.getElementById('register-success');
    successMessage.textContent = 'Registration successful! You can now log in.';
    successMessage.style.color = 'green';
    successMessage.style.display = 'block'; // Show success message

    // Switch to login form and clear credentials
    showLogin();
});

// Email validation function
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}