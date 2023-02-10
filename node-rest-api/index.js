const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

mongoose
   .connect("mongodb://127.0.0.1:27017/mydatabase")
   .then((x) => {
      console.log(
         `Connected to Mongo! Database Name: "${x.connections[0].name}"`
      );
   })
   .catch((err) => {
      console.log(`Error connecting to mongo`, err.reason);
   });

const bookRoute = require("./routes/book.routes");
const app = express();
app.use(bodyParser.json());
app.use(
   bodyParser.urlencoded({
      extended: false,
   })
);

app.use(cors());

// Static Directory Path
app.use(
   express.static(path.join(__dirname, "dist/angular-mean-crud-tutorial"))
);

// API Route
app.use("/api", bookRoute);

// PORT
const port = process.env.port || 8000;
app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});

// 404 HANDLER
app.use((req, res, next) => {
   next(createError(404));
});

// BASE ROUTE
app.get("/", (req, res) => {
   res.send("Invalid Endpoint");
});
app.get("*", (req, res) => {
   res.sendFile(
      path.join(__dirname, "dist/angular-mean-crud-tutorial/index.html")
   );
});

// ERROR HANDLER
app.use(function (err, req, res, next) {
   console.log(err.message);
   if (!err.statusCode) err.statusCode = 500;
   res.status(err.statusCode).send(err.message);
});
