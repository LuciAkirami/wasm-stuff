const express = require("express");
const app = express();
const path = require("path");

// Serve static files from the "public" directory
// the wasm files are stored in the public folder as these are static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => console.log("Server Running at 3000"));
