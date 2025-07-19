<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page d'Inscription</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .signup-box {
            background-color: #fff;
            padding: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            width: 300px;
        }

        .signup-box h2 {
            text-align: center;
            color: #333;
        }

        .input-field {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .submit-btn {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px;
            width: 100%;
            border-radius: 4px;
            cursor: pointer;
        }

        .submit-btn:hover {
            background-color: #45a049;
        }

        .error-message {
            color: red;
            text-align: center;
            font-size: 14px;
        }
    </style>
</head>
<body>

    <div class="container">
        <div class="signup-box">
            <h2>Inscription</h2>
            <form id="signupForm">
                <input type="email" name="email" class="input-field" placeholder="Email" required>
                <input type="password" name="password" class="input-field" placeholder="Mot de Passe" required>
                <button type="submit" class="submit-btn">S'inscrire</button>
            </form>
            <div id="errorMessage" class="error-message"></div>
        </div>
    </div>

    <script>
        const form = document.getElementById('signupForm');
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = form.email.value;
            const password = form.password.value;

            fetch('/api/sendConfirmationEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    alert('Email de confirmation envoyé!');
                } else {
                    alert('Erreur lors de l\'envoi de l\'email.');
                }
            })
            .catch(error => {
                console.error('Erreur:', error);
                alert('Une erreur s\'est produite.');
            });
        });
    </script>

</body>
</html>
