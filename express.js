const express = require('express');
const app = express();
const PORT = 3000;
const path = require("path");
const distPath = path.join(__dirname, "dist");

app.use(express.static(distPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));