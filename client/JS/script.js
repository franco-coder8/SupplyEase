document.addEventListener("DOMContentLoaded", function() {
    const mainContainer = document.querySelector('.main-container');
    if (mainContainer) {
        mainContainer.style.flexDirection = 'row';
    }
});

  const showLogin = () => {
            const loginContainer = document.getElementById('loginContainer');
            const registerContainer = document.getElementById('registerContainer');

            loginContainer.style.display = 'block';
            registerContainer.style.display = 'none';
        }

        const showRegister = () => {
            const loginContainer = document.getElementById('loginContainer');
            const registerContainer = document.getElementById('registerContainer');

            loginContainer.style.display = 'none';
            registerContainer.style.display = 'block';
        }