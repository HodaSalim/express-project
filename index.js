const express = require("express");
const fs = require("fs");

const app = express();
const port = 3000;

const handleOutOfOfficeHours = (req, res, next) => {
  const date = new Date();

  const currentHour = date.getHours() + 1;
  console.log(currentHour);

  if (currentHour >= 9 && currentHour < 17) {
    next();
    return;
  }

  const data = fs.readFileSync("./out-office.html");
  const html = data.toString();

  res.status(301).set("Content-Type", "text/html").send(html);
};

app.use(handleOutOfOfficeHours);

app.get("/", (req, res) => {
  const data = fs.readFileSync("home.html");
  const html = data.toString();

  res.status(200).set("Content-Type", "text/html").send(html);
});

app.get("/contact", (req, res) => {
  fs.readFile("contact.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

app.get("/services", (req, res) => {
  fs.readFile("services.html", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    return res.end();
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
