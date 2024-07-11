const fs = require('fs');
const https = require('https');
const express = require('express');
const selfsigned = require('selfsigned');

const app = express();
const port = 3000;

// 生成自签名证书
const pems = selfsigned.generate(null, { days: 365 });

// 写入证书和密钥到文件
fs.writeFileSync('key.pem', pems.private);
fs.writeFileSync('cert.pem', pems.cert);

// 读取 SSL 证书和私钥
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// 定义一个简单的路由
app.get('/', (req, res) => {
  res.send('Hello, HTTPS!');
});



// 创建 HTTPS 服务器
https.createServer(options, app).listen(port, () => {
  console.log(`HTTPS Server is running at https://localhost:${port}`);
});

https.get("https://www.okx.com/priapi/v5/ecotrade/public/history-positions?limit=5&uniqueName=540D011FDACCB47A")