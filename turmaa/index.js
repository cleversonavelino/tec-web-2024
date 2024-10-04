var express = require('express');
var app = express();

app.use(express.static('./pages'));

const port = 3000;
const router = express.Router();
app.use(express.json());

var produtos = [];
var usuarios = [];

router.post("/api/usuarios", (request, response) => {
    const usuario = request.body;
    usuario.id = usuarios.length + 1;
    usuarios.push(usuario);
    response.status(201).json(usuario);
});

router.get("/api/produtos", (request, response) => {    
    response.status(200).json(produtos);
});

router.post("/api/produtos", (request, response) => {
    const produto = request.body;
    produto.id = produtos.length + 1;
    produtos.push(produto);
    response.status(201).json(produto);
});

router.delete("/api/produtos/:id", (request, response) => {
    const id = request.params.id;
    console.log(produtos);
    produtos = produtos.filter(p => p.id != id);    
    response.status(204).send("produtos excluído com sucesso");
});

//filter
//reduce
//map

app.use(router);
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});