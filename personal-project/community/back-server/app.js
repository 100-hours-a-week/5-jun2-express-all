const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const userRouter = require('./routes/userRouter');

app.use("/users", userRouter);

app.get('/', (req, res) => {
    res.send("ok");
})

app.listen(PORT, () => {
    console.log(`Back end server is running on ${PORT}`);
})