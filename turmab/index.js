var express = require('express');
var app = express();
app.use(express.json());

app.use(express.static('./pages'));


var mysql = require('mysql');
var con = mysql.createConnection({
    host: "35.202.15.50",
    user: "root",
    password: "123456"
});
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const produtos = [];

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
    con.query("SELECT u.id, u.email, u.status FROM usuario u", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
    res.status(200).json({});
});
router.post('/api/usuarios', (req, res) => {
    var usuario = req.body;
    var sql = `INSERT INTO usuario (email, senha, status) VALUES ('${usuario.email}', '${usuario.senha}',
    '${usuario.status}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    res.status(201).json(usuario);
});
router.get('/api/usuarios/:id', (req, res) => {
    const id = req.param("id");
    console.log(id);
    const resultado = usuarios.filter(u => u.id == id);
    res.status(200).json(resultado[0]);
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