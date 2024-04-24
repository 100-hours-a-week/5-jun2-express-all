const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

const routes = [
    { path: '/', file: 'index.html' },
    { path: '/login', file: 'login.html' },
    { path: '/signup', file: 'signup.html' },
    { path: '/boards', file: 'board-list.html' },
    { path: '/board-detail', file: 'board-detail.html' },
    { path: '/board-modify', file: 'board-modify.html' },
    { path: '/board-write', file: 'board-write.html' },
    { path: '/user-modify', file: 'user-modify.html' },
    { path: '/password-modify', file: 'password-modify.html' },
    { path: '/boards/:boardId', file: 'board-detail.html'},
    { path: '/boards/:boardId/edit', file: 'board-modify.html'}
];

routes.forEach(route => {
    app.get(route.path, (req, res) => {
        res.sendFile(path.join(publicPath, 'html', route.file));
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
