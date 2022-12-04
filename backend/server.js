const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");
const path = require("path");

const app = express();

const port = 5000;

connectToMongo();

app.use(cors());

app.use(express.json());

//available routes
app.use("/api/auth", require("./routes/auth"));

app.use("/api/notes", require("./routes/notes"));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../build/index.html"), function (err) {
    if (err) {
      console.log(err);
    }
  });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});