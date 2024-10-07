var express = require('express');
var app = express();
app.use(express.json());

app.use(express.static('./pages'));


var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456", 
    database: "aula"   
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

//endpoint para listar todos os usuários
router.get('/api/usuarios', (req, res) => {
    let sql = "SELECT u.id, u.email, u.status FROM usuario u";
    con.query(sql, function (err, result) {
        if (err) throw err;        
        res.status(200).json(result);
    });       
});

//endpoint para salvar um usuário
router.post('/api/usuarios', (req, res) => {
    var usuario = req.body;
    var sql = `INSERT INTO usuario (email, senha, status) VALUES 
    ('${usuario.email}', '${usuario.senha}','${usuario.status ? 1 : 0}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;        
    });
    res.status(201).json(usuario);
});

//endpoint para capturar um usuário por id
router.get('/api/usuarios/:id', (req, res) => {
    const id = req.param("id");
    
    let sql = `SELECT u.id, u.email, u.status FROM usuario u WHERE u.id = ${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;        
        res.status(200).json(result[0]);
    });     
});

//endpoint para excluir um usuário
router.delete('/api/usuarios/:id', (req, res) => {
    const id = req.param("id");
    
    var sql = `DELETE FROM usuario WHERE id = ${id} `;
    con.query(sql, function (err, result) {
        if (err) throw err;        
    });

    res.status(200).send(`usuario com id ${id} excluído`);
});

app.use(router);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});