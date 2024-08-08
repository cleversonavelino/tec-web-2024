var express = require('express');
var app = express();

app.use(express.static('./pages'));

const port = 3000;

app.get('/hello', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});