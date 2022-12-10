const express = require("express");
const router = express.Router();
const NodeCache = require("node-cache");
const myCache = new NodeCache();
const qiniu = require("qiniu");

require("dotenv").config();

const path = process.env.upDatePath;

router.get(path, async (req, res) => {
  let uploadToken = "";
  if (myCache.has("QINIU_TOKEN")) {
    uploadToken = myCache.get("QINIU_TOKEN");
  }
  // 获取七牛云token
  const accessKey = process.env.accessKey;
  const secretKey = process.env.secretKey;
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    scope: "liang-compress",
    expires: 3600,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  uploadToken = putPolicy.uploadToken(mac);
  myCache.set("QINIU_TOKEN", uploadToken, 3500);
  return res.json({ status: 200, uptoken: uploadToken });
});

module.exports = router;
