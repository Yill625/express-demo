const express = require("express")
const app = express()
const port = 3000
app.get("/success", (req, res) => {
  res.json({ code: 0, result: [{ name: 111, age: 111, avatar: 111 }] })
})
app.get("/success-message", (req, res) => {
  res.json({ code: -100, message: "一个小小的错误" })
})
app.get("/error", (req, res) => {
  res.status(500).json({ error: "message" })
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
