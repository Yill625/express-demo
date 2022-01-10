const express = require("express")
const app = express()
const port = 3000

app.get("/", (req, res) => {
  // 响应方法
  // 下载
  //   res.download("./api/login.js")
  // 快速结束响应
  //   res.end()
  //   res.json(null)
  //   res.json({ user: "tobi" })
  res.status(500).json({ error: "message" })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
