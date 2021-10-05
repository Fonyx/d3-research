const express = require('express');
const controllers = require('./controllers');
const path = require('path');
var app = express();
const PORT = 3000;

app.use(controllers);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// cors middleware header setup for server
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.use('/', (req, res) => {
    res.sendFile('C:/Users/nicka/Documents/d3-research/public/index.html');
})

app.listen(PORT, ()=>{
    console.log('App listening on http://localhost:'+PORT);
})