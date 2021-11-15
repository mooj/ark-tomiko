const path = require("path");
const express = require("express");
const request = require("request");
const DIST_DIR = path.join(__dirname, "docs");
const PORT = 3000;
const app = express();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
  next();
});

app.get("/api/*", (req, res) => {
//  const symbol = req.query["symbol"];
//  const range = req.query["range"];
//console.log('request##########', req);
  const url = `https://arkservers.net${req.url}`;
//console.log(url);
  request(url).pipe(res);
});

//Send index.html when the user access the web
app.get("*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});



app.listen(PORT, () =>
  console.log(`StockChart app listening on port ${PORT}!`)
);
