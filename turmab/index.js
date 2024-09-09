var express = require('express');
var app = express();
app.use(express.json());

app.use(express.static('./pages'));

const produtos = [];

const router = express.Router();
router.get('/api/produtos', (req, res) => {  
    console.log('entrou no get');
    res.status(200).json(produtos);
});
router.post('/api/produtos', (req, res) => {  
    console.log('entrou no post');
    console.log(req.body);

    var produto = req.body;
    produto.id = 1;

    produtos.push(produto);
    res.status(201).json(produto);
});

app.use(router);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});