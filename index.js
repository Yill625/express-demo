const express = require("express");
const app = express();
const port = 3000;
const login = require("./api/login");
const wx = require("./api/wx");
app.use("/login", login); // 路由中间件
app.use("/wx", wx); // 路由中间件

app.get(
  "/user/:id",
  function (req, res, next) {
    // if the user ID is 0, skip to the next route
    if (req.params.id == 0) next("route");
    // otherwise pass the control to the next middleware function in this stack
    else next(); //
  },
  function (req, res, next) {
    // render a regular page
    res.send("regular");
  }
);

// handler for the /user/:id path, which renders a special page
app.get("/user/:id", function (req, res, next) {
  res.send("special");
});

// next 下一个中间件 next('route')下一个相同路由中间件
app.get("/", (req, res) => {
  res.send(req.ip);
});

// 应用层中间件
app.use("/login", function (req, res, next) {
  console.log("Time:", Date.now());
  throw Error(11);
  next();
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
