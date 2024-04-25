const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

console.log(path.join(__dirname, 'uploads'));

const userRouter = require('./routes/userRouter');
const boardRouter = require('./routes/boardRouter');
const imageRouter = require('./routes/imageRouter');

app.use("/users", userRouter);
app.use("/boards", boardRouter);
app.use("/images", imageRouter, express.static(path.join(__dirname, 'uploads')));

// check server connection
app.get('/', (req, res) => {
    res.send("ok");
})

app.listen(PORT, () => {
    console.log(`Back end server is running on ${PORT}`);
})