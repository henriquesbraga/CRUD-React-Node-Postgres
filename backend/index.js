const express = require('express');

//usa process.env para manter as variaveis privadas
require('dotenv').config();


//Intermediador Express
const helmet = require('helmet'); //cria cabeçalhos para proteção contra ataques (segurança)
const bodyParser = require('body-parser'); //transforma a resposta em um formato usável
const cors = require('cors'); //permite/bloqueia a comunicação entre sites
const morgan = require('morgan'); //logs de requisição


//Conexão com o banco
var db = require('knex')({
    client: 'pg',
    connection:{
        host: 'localhost',
        user: 'postgres',
        password: '1234',
        database: 'crud-practice'
    }
});


//Controladores - queries do banco de dados
const main = require('./controllers/main');

//Aplicação
const app = express();

//Intermediador App
const whitelist = ['http://localhost:3001'];
const corsOptions = {
    origin: function (origin, callback){
        if(whitelist.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }
        else{
            callback(new Error('Não permitido pelo CORS'));
        }
    }
}

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(morgan('combined'));

//Rotas do App

app.get('/', (request, response) => response.send('Hello World'));
app.get('/crud', (request, response) => main.getTableData(request, response, db));
app.post('/crud', (request, response) => main.postTableData(request, response, db));
app.put('/crud', (request, response) => main.putTableData(request, response, db));
app.delete('/crud', (request, response) => main.deleteTableData(request, response, db));

//Conexão do servidor
app.listen(process.env.PORT || 3000, () => {
    console.log(`App está funcionando na porta: ${process.env.PORT || 3000}`)
});