const path = require("path");
const express = require("express");
const request = require("request");
const DIST_DIR = path.join(__dirname, "docs");
const PORT = process.env.PORT || 3000;
const app = express();
//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/api/*", (req, res) => {
  const url = `https://arkservers.net${req.url}`;
  request(url).pipe(res);
});


app.listen(PORT, () =>
  console.log(`App started. Listening on port ${PORT}!`)
);
