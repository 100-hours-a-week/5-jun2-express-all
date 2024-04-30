const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser')
const app = express();
const MemoryStore = require('memorystore')(session);

const userRouter = require('./routes/userRouter');
const boardRouter = require('./routes/boardRouter');
const imageRouter = require('./routes/imageRouter');
const profileRouter = require('./routes/profileRouter');

const corsOprions = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(session({
    name: 'session_id',
    secret: 'exam_secret_key',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore(),
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,    // https 라면 true 설정해야 함 -> JS에서 사용 불가능
        secure: false
    }
}))

const PORT = 8080;

app.use(cors(corsOprions));
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/users", userRouter, express.static(path.join(__dirname, 'profiles')));
app.use("/boards", boardRouter);
app.use("/images", imageRouter, express.static(path.join(__dirname, 'uploads')));
app.use("/profiles", profileRouter, express.static(path.join(__dirname, 'profiles')));

// check server connection
app.get('/', (req, res) => {
    res.send("ok");
})

app.listen(PORT, () => {
    console.log(`Back end server is running on ${PORT}`);
})