var express = require('express');
var app = express();

const port = 3000;

app.use(express.static('./pages'));

app.get('/hello', (req, res) => {
    res.send('Hello, World! 123');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});