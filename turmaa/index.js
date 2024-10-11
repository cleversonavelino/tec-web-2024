var express = require('express');
var app = express();

app.use(express.static('./pages'));

const port = 3000;
const router = express.Router();
app.use(express.json());

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123456",
    database: "aula"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

var produtos = [];


router.post("/api/usuarios", (request, response) => {
    const usuario = request.body;

    var sql = `INSERT INTO usuario (nome, email, data, estado) 
    values
    ('${usuario.nome}',
    '${usuario.email}',
    '${usuario.data}',
    '${usuario.estado}')`;

    con.query(sql, function (err, result) {
        if (err) throw err;
    });

    response.status(201).json(usuario);
});
router.get("/api/usuarios", (request, response) => {
    var sql = 'SELECT id, nome, email, estado FROM usuario';
    con.query(sql, function (err, result) {
        if (err) throw err;
        response.status(200).json(result);
    });    
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