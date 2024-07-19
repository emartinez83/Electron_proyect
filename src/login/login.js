document.getElementById('showRegister').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.login-container').classList.add('hidden');
    document.getElementById('registerContainer').classList.remove('hidden');
});

document.getElementById('showLogin').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.login-container').classList.remove('hidden');
    document.getElementById('registerContainer').classList.add('hidden');
});

// login.js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Enviar solicitud de inicio de sesión
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const result = await response.json();
        if (result.success) {
            // Mostrar mensaje de éxito y redirigir
            alert('Inicio de sesión exitoso!');
            window.location.replace('../view/index.html'); // Cambia esto por la ruta correcta a tu vista principal
        } else {
            // Mostrar mensaje de error
            console.error('Error en el inicio de sesión:', result.message);
        }
    } catch (error) {
        console.error('Error al enviar solicitud de inicio de sesión:', error);
    }
});


document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const name = document.getElementById('name').value;
    const last_name = document.getElementById('last_name').value;

    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password, name, last_name })
        });

        const result = await response.json();
        if (result.success) {
            console.log('Registro exitoso');
        } else {
            console.error('Error en el registro:', result.message);
        }
    } catch (error) {
        console.error('Error al enviar solicitud de registro:', error);
    }
});
