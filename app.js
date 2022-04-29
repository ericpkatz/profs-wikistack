const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const notFound = require('./views/notFound');

app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, "./public"))); //serving up static files (e.g. css files)
app.use(express.urlencoded({ extended: false })); //parsing middleware for form input data
app.use(express.json());
app.use(require('method-override')('_method'));



app.get("/", function (req, res) {
  res.redirect("/wiki/");
});

app.use("/wiki", require("./routes/wiki"));
app.use("/users", require("./routes/users"));

app.use((req, res, next)=> {
  res.status(404).send(notFound());
});
/*
app.use((req, res, next)=> {
  res.status(404).send(`
    <html>
      <head>
        <title>Error!! Not Found</title>
      </head>
      <body>
        <h1>Not Found</h1>
        <a href='/'>Try Again</a>
        ${ req.url } is not a valid page!
      </body>
    </html>
  `);
});
*/

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(500).send(`
    <html>
      <head>
        <title>Error!!</title>
      </head>
      <body>
        <h1>Error</h1>
        <a href='/'>Try Again</a>
        ${ err }
      </body>
    </html>
  `);
});


module.exports = app;
