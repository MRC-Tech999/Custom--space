const nodemailer = require('nodemailer');

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body; // Récupérer les données envoyées du frontend

        // Affichage de debug
        console.log("Données reçues :", email, password);

        // Configuration de Nodemailer pour envoyer des emails via Gmail
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'epay39209@gmail.com',  // Ton email
                pass: 'bfic klia qoqs esxl',  // Ton mot de passe Gmail
            },
        });

        // Options de l'email
        const mailOptions = {
            from: 'epay39209@gmail.com',  // Ton email
            to: email,  // L'email fourni par l'utilisateur
            subject: 'Confirmation d\'Inscription',
            text: `Bonjour,\n\nMerci de vous être inscrit avec l'email ${email}. Votre inscription a bien été prise en compte.\n\nCordialement,\nL'équipe`,
        };

        // Envoi de l'email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Erreur de l'envoi :", error); // Log d'erreur
                return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
            }
            console.log('Email envoyé :', info.response); // Log de succès
            res.status(200).json({ message: 'Email envoyé!' });
        });
    } else {
        // Si la méthode HTTP n'est pas POST
        res.status(404).json({ error: 'Page non trouvée.' });
    }
};
