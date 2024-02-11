const express = require('express');
const users = require('./MOCK_DATA.json');
const app = express();

const PORT = 5050;


//ROUTES
app.get('/users', (req, res) =>{
    return res.json(users);
} );
express().listen(PORT, ()=> console.log(`server listening to port ${PORT}`));