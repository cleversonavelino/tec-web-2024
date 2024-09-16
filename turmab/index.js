var express = require('express');
var app = express();
app.use(express.json());

app.use(express.static('./pages'));

const produtos = [];
const usuarios = [];

const router = express.Router();
router.get('/api/produtos', (req, res) => { 
    res.status(200).json(produtos);
});
router.get('/api/usuarios', (req, res) => { 
    res.status(200).json(usuarios);
});
router.post('/api/produtos', (req, res) => {     
    var produto = req.body;
    produto.id = 1;
    produtos.push(produto);    
    res.status(201).json(produto);
});
router.post('/api/usuarios', (req, res) => {     
    var usuario = req.body;
    usuario.id = 1;
    usuarios.push(usuario);    
    res.status(201).json(usuario);
});

app.use(router);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});