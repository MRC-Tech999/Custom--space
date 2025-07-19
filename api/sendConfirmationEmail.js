const transporter = require('./transporter');  // Importer le transporteur depuis le fichier transporter.js

module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { email } = req.body;  // Récupérer l'email du corps de la requête

        const mailOptions = {
            from: 'epay39209@gmail.com',  // L'email de l'expéditeur
            to: email,  // L'email du destinataire
            subject: 'Confirmation d\'Inscription',
            text: `Bonjour,\n\nMerci de vous être inscrit avec l'email ${email}. Votre inscription a bien été prise en compte.\n\nCordialement,\nL'équipe`,
        };

        // Envoyer l'email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Erreur de l\'envoi d\'email:', error);
                return res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.' });
            }
            console.log('Email envoyé:', info.response);
            res.status(200).json({ message: 'Email envoyé!' });
        });
    } else {
        res.status(404).json({ error: 'Page non trouvée.' });
    }
};
