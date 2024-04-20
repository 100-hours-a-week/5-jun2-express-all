const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userRouter = require('./routes/userRouter');
const boardRouter = require('./routes/boardRouter');

app.use("/users", userRouter);
app.use("/boards", boardRouter);

// check server connection
app.get('/', (req, res) => {
    res.send("ok");
})

app.listen(PORT, () => {
    console.log(`Back end server is running on ${PORT}`);
})