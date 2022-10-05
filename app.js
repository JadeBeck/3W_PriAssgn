const express = require('express');
const app = express();

const connect = require("./schemas");
connect();

app.use(express.json());
const postsRouter = require("./routes/posts");

const commentsRouter = require("./routes/comments");
app.use("/api", [postsRouter, commentsRouter]);

app.get('/', (req, res) => {
    res.send('반가워용✨😎`!');
});

const port = 3002;
app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});