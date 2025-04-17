let posts = []; // Stockage des publications en mémoire

// Fonction pour ajouter une publication
function addPost() {
    const newPost = document.getElementById("new-post").value;
    if (newPost.trim()) {
        posts.push(newPost);  // Ajouter la publication à la liste en mémoire
        displayPosts(); // Rafraîchir l'affichage des publications
        document.getElementById("new-post").value = ''; // Vider le champ
    }
}

// Fonction pour afficher les publications
function displayPosts() {
    const postsList = document.getElementById("posts-list");
    postsList.innerHTML = ''; // Réinitialiser la liste des publications
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "post";
        postElement.innerText = post;
        postsList.appendChild(postElement);
    });
}

// Fonction de notification (Exemple simple)
function showNotification(message) {
    alert(message); // Simple notification pour l'instant
}

// Simuler la connexion et l'affichage du profil
document.addEventListener('DOMContentLoaded', () => {
    // Cette logique devrait être dynamique en fonction des informations utilisateur
    displayPosts();
});
