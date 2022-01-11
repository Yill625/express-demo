const express = require("express");
const app = express();
const port = 3000;
const login = require("./api/login");
app.use("/login", login); // 路由中间件

// 应用层中间件
app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  throw Error(11);
  next();
});

// app.use(
//   "/user/:id",
//   function (req, res, next) {
//     console.log("Request URL:", req.originalUrl);
//     next();
//   },
//   function (req, res, next) {
//     console.log("Request Type:", req.method);
//     next();
//   }
// );

// app.get("/user/:id", function (req, res, next) {
//   res.send("USER");
// });

// app.get(
//   "/user/:id",
//   function (req, res, next) {
//     console.log("ID:", req.params.id);
//     next();
//   },
//   function (req, res, next) {
//     res.send("User Info");
//   }
// );

// // handler for the /user/:id path, which prints the user ID
// app.get("/user/:id", function (req, res, next) {
//   res.end(req.params.id);
// });

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
  // 响应方法
  // 下载
  // res.download("./api/login.js");
  // 快速结束响应
  //   res.end()
  //   res.json(null)
  //   res.json({ user: "tobi" })
  //   res.status(500).json({ error: "message" })
  //   res.jsonp({ user: "tobi" })
  // 默认302进行重定向
  //   res.redirect("http://example.com")
  //   需要配合专门模板引擎
  //   res.render("index", function (err, html) {
  //     res.send(html)
  //   })
  // res.send 发送各种消息
  // res.set("Content-Type", "text/html");
  // res.send(Buffer.from("<p>some html</p>"));
  res.send(req.ip);
  // res.sendStatus(404);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
