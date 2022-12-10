const express = require("express");
const router = express.Router();
const NodeCache = require("node-cache");
const myCache = new NodeCache();
require("dotenv").config();
const axios = require("axios");

async function getAccessToken() {
  if (myCache.has("ACCESS_TOKEN")) {
    return myCache.get("ACCESS_TOKEN");
  } else {
    // 获取微信ACCESS_TOKEN
    const params = {
      grant_type: "client_credential",
      appid: process.env.APPID,
      secret: process.env.SECRET,
    };
    // 获取配置文件
    const res = await axios({
      method: "get",
      url: "https://api.weixin.qq.com/cgi-bin/token",
      params,
    });
    if (res.status === 200 && res.data.access_token) {
      console.log(res.data);
      myCache.set("ACCESS_TOKEN", res.data.access_token, 2 * 60 * 3600);
      return res.data.access_token;
    }
  }
}

async function getOpenId(code) {
  // 获取配置文件
  const params = {
    grant_type: "authorization_code",
    js_code: code,
    appid: process.env.APPID,
    secret: process.env.SECRET,
  };
  const res = await axios({
    method: "get",
    url: "https://api.weixin.qq.com/sns/jscode2session",
    params,
  });
  if (res.status === 200 && res.data.openid) {
    return res.data.openid;
  }
}
// getAccessToken();
// 微信检测接口
router.get("/media_check_async", async (req, res) => {
  const accessToken = await getAccessToken();
  const url = `https://api.weixin.qq.com/wxa/media_check_async?access_token=${accessToken}`;
  const openid = await getOpenId(res.params.code);
  const data = {
    access_token,
    media_url: req.params.url,
    media_type: 1,
    version: 2,
    openid,
    scene: 1,
  };
  const res = await axios({
    method: "post",
    url,
    data,
  });
  if (res.status === 200 && res.data.openid) {
    res.json({ status: 200, result: res.data });
  } else {
    res.json({ status: 401, result: res.data });
  }
});

module.exports = router;
