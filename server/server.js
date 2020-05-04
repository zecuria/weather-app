const http = require('http');
const express = require('express');

const router = express();
const server = http.createServer(router);

const { PORT = 3001 } = process.env;

router.get('/', (req, res) => {
    res.send('Hello world!');
});

server.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}...`)
});