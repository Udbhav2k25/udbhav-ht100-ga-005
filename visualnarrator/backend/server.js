// backend/server.js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Default route — fixes "Cannot GET /"
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Generate story
app.post("/generate-story", (req, res) => {
  const { images } = req.body;

  if (!images || images.length === 0) {
    return res.status(400).json({ error: "No image captions provided" });
  }

  // Fix template string
  const story = images
    .map((img, i) => ` ${img.caption}`)
    .join(". Then, ");

  res.json({ story });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend is Running at http://localhost:${PORT}`);
});