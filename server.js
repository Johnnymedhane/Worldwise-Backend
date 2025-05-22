

const express = require("express");
const cors = require("cors");
const citiesRoutes = require("./routes/cities");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/cities", citiesRoutes);

app.get("/", (req, res) => res.send("Cities API is running"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
