const express = require('express')
const app = express()
const port = 3000

const memos = ["메모 01","메모 02","메모 03"];

// ' / ' 주소로 들어오면 응답값으로 'Hello World!'를 보내주겠다는 의미
app.get('/api/memos', (req, res) => {
  res.send(memos)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})