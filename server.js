const express = require('express');
const controllers = require('./controllers');
const path = require('path');
var app = express();
const PORT = 3000;

app.use(controllers);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res) => {
    res.sendFile('index.html');
})

app.listen(PORT, ()=>{
    console.log('App listening on http://localhost:'+PORT);
})