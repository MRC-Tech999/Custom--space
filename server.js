const express = require("express");
const app = express();

// Serve static files from the public folder
app.use(express.static("public"));

// Serve the index.html as the home page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
