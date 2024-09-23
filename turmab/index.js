var express = require('express');
var app = express();
app.use(express.json());

app.use(express.static('./pages'));

const produtos = [];
const usuarios = [];

let idUsuarios = 0;

const router = express.Router();
router.get('/api/produtos', (req, res) => { 
    res.status(200).json(produtos);
});
router.post('/api/produtos', (req, res) => {     
    var produto = req.body;
    produto.id = 1;
    produtos.push(produto);    
    res.status(201).json(produto);
});

router.get('/api/usuarios', (req, res) => { 
    res.status(200).json(usuarios);
});
router.get('/api/usuarios/:id', (req, res) => { 
    const id = req.param("id");
    console.log(id);

    const resultado = usuarios.filter(u => u.id == id);

    res.status(200).json(resultado[0]);
});
router.post('/api/usuarios', (req, res) => {     
    var usuario = req.body;
    usuario.id = ++idUsuarios;
    usuarios.push(usuario);    
    res.status(201).json(usuario);
});
router.delete('/api/usuarios/:id', (req, res) => { 
    const id = req.param("id");
    console.log(id);

    var removeIndex = usuarios.map(item => item.id).indexOf(id);
    usuarios.splice(removeIndex, 1);

    res.status(200).send(`usuario com id ${id} excluído`);
});

app.use(router);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});