const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const FileStore = require('session-file-store')(session);

app.use(session({
    secret: 'exam_secret_key',
    resave: false,
    cookie: { maxAge: 30000 },
    saveUninitialized: true,
    store: new FileStore(),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,
        secure: false
    }
}))

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