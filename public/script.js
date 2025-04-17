// Exemple de code JavaScript pour interagir avec le formulaire de connexion
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    // Récupérer les valeurs du formulaire
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Afficher dans la console (à remplacer par une logique d'authentification réelle)
    console.log('Email:', email);
    console.log('Mot de passe:', password);
});
