const express = require('express');
const { connectMongoDB } = require('./connection');
const morgan = require("morgan");
const fs = require("fs");
const app = express();
const userRouter = require("./routes/user");

const PORT = 5050;


//Connection
connectMongoDB("mongodb://127.0.0.1:27017/himanshu_first_db")



// Schema 





//Middleware or Pluggin

app.use(express.urlencoded({ extended: false }));  //Express Middleware

app.use(morgan("tiny"))
app.use(()=> {console.log("hello there!");
next();
})

app.use((req, res, next) => {
    console.log("Hello from middleware 1");
    next();
});

app.use((req, res, next) => {
    console.log("Hello from middleware 2");
    next();
});

app.use((req, res, next) => {
    console.log("hello from middleware 3")
    fs.appendFile(
        "./log.txt",
        ` \n ${Date.now()}:  ${req.ip}: ${req.method}:  ${req.path} \n`,
        (err, data) => {
            next();
        }

    );
});
//ROUTES


// app.patch("/api/users/:id", (req, res) => {
//     // TO DO: Edit the User with ID
//     return res.json({status: "pending"})
// })

// app.delete("/api/users/:id", (req, res) => {
//     // TO DO: Delete the User with ID
//     return res.json({status: "pending"})
// })
app.use("/user", userRouter);

app.listen(PORT, () => console.log(`server listening to port ${PORT}`));