const express = require('express');
const mongoose = require('mongoose'); 
const cors = require('cors'); //requests de diferentes dispositivos
const routes = require('./routes');
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000; //requisito no deploy para o hiroku, diz a porta em que a app vai correr, se corfer de forma local usa o porto 8000

app.use(cors());
app.use(express.json()); //obter resposta em json

if(process.env.NODE_ENV != 'production') {
    require('dotenv').config()  //se ligarmos o servidor em modo dev  importa as variaveis de .env, onde estao as credenciais de acesso a DB do mongoDB
}

try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('MongoDB connected')
} catch (error) {
    console.log(error)
}

app.use("/files", express.static(path.resolve(__dirname, "..", "files")));
app.use(routes); //utiliza as routes no ficheiro routes.js

app.listen(PORT, () =>{
    console.log(`Listening on ${PORT}`);
})