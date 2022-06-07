const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");

const memos = [];

app.use(bodyParser.json());

app.get('/api/memos', (req, res) => {
  res.send(memos);
});

app.post('/api/memos', (req, res) => {
  memos.push(req.body.contents);
  res.send(memos);
});

app.put('/api/memos:idx', (req, res) => {
  // 보내준 인덱스를 불러올때 params 확인
  memos[req.params.idx] = req.body.content;
  res.send(memos);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});