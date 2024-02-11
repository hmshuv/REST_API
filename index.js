const express = require('express');
const app = express();

const PORT = 5050;

express().listen(PORT, ()=> console.log(`server listening to port ${PORT}`));