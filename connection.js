const mongoose = require('mongoose');

async function connectMongoDB(url){
    return mongoose
    .connect('url')
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log("Mongo err", err));
}

module.exports = {
    connectMongoDB,
}