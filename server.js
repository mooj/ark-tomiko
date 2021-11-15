const path = require("path");
const express = require("express");
const request = require("request");
const DIST_DIR = path.join(__dirname, "docs");
const PORT = process.env.PORT || 3000;
const app = express();
//const router = express.Router();

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.ORIGIN || "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//router.get('/api/', async function (req: Request, res: Response, next: NextFunction) {
//  try {
//    const repository = await getProductRepository();
//    const product = await repository.findOne(req.params.id);
//    res.send(product);
//  }
//  catch (err) {
//    return next(err);
//  }
//});

app.get("/api/*", (req, res) => {
  const url = `https://arkservers.net${req.url}`;
  request(url).pipe(res);
});


////Send index.html when the user access the web
//app.get("*", function (req, res) {
//  res.sendFile(path.join(DIST_DIR, "index.html"));
//});



app.listen(PORT, () =>
  console.log(`StockChart app listening on port ${PORT}!`)
);
