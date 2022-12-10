const express = require("express");
const app = express();
const port = 3001;
const host = "127.0.0.1";
const wx = require("./api/wx");

app.use("/wx", wx);

app.get("/success", (req, res) => {
  res.json({ code: 0, result: [{ name: 111, age: 111, avatar: 111 }] });
});
app.get("/success-message", (req, res) => {
  res.json({ code: -100, message: "一个小小的错误" });
});
app.get("/error", (req, res) => {
  res.status(500).json({ error: "message" });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, host);

console.log(`Example app listening`, host, port);
