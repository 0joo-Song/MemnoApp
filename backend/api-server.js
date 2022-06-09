const express = require('express')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
const database = require("./database");
const e = require('express');

app.use(bodyParser.json());

app.get('/api/memos', async (req, res) => {
    const result = await database.run("SELECT * FROM memos");
    res.send(result)
});

app.post("/api/memos", async (req, res) => {
    await database.run(`INSERT INTO memos (content) VALUES (?)`, [req.body.content]);
    const result = await database.run("SELECT * FROM memos");
    res.send(result);
});

app.put("/api/memos/:id", async(req, res) => {
    await database.run(`UPDATE memos SET content = ? WHERE id = ?`, [req.body.content, req.params.id]);
    const result = await database.run("SELECT * FROM memos");
    res.send(result);
});

app.post("/api/memos/delMemo/:id", async(req, res) => {
    await database.run(`DELETE FROM memos WHERE id = ?`, [req.params.id]);
    const result = await database.run("SELECT * FROM memos");
    res.send(result);
});

app.put("/api/memos/compMemo", async(req, res) => {
    if([req.body.complete] == 'Y'){
        await database.run(`UPDATE memos SET complete = 'N' WHERE id = ?`, [ req.params.id]);
    }else{
        await database.run(`UPDATE memos SET complete = 'Y' WHERE id = ?`, [ req.params.id]);
    }
    const result = await database.run("SELECT * FROM memos");
    res.send(result);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});