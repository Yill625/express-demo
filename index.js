const express = require("express")
const app = express()
const port = 3000
app.get("/success", (req, res) => {
  res.json({ code: 0, result: [{ name: 111, age: 111, avatar: 111 }] })
})
app.get("/success-message", (req, res) => {
  res.json({ code: -100, message: "一个小小的错误" })
})
app.get("/end", (req, res) => {
  res.end()
})
app.get("/error", (req, res) => {
  // 响应方法
  // 下载
  // res.download("./api/login.js")
  // 快速结束响应
  //   res.end()
  //   res.json(null)
  //   res.json({ user: "tobi" })
  res.status(500).json({ error: "message" })
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
  res.send(req.ip)
  // res.sendStatus(404);
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
