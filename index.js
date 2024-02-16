const express = require('express');

const mongoose = require('mongoose');
const morgan = require("morgan");
const fs = require("fs");
const app = express();

const PORT = 5050;


//Connection
mongoose
.connect('mongodb://127.0.0.1:27017/himanshu_first_db')
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("Mongo err", err));




// Schema 
const userSchema = new mongoose.Schema({
    firstName:{
        type: String, 
        required: true,
    },
    lastName:{
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,

    },
    gender: {
        type: String,
    },
},
{timestamps: true})

const User = mongoose.model('user', userSchema)


//Middleware or Pluggin

app.use(express.urlencoded({ extended: false }));  //Express Middleware

app.use(morgan("tiny"))

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
app.get("/", (req, res) => {
    return res.send("Welcome to home page of REST API project");
})
app.get("/users", async (req, res) => {
    const allDBUsers = await User.find({})
    const html = `
    <ul>
    ${allDBUsers.map((user) => `<li> ${user.email} - ${user.firstName} </li>`).join("   ")}
    </ul>`
        ;
    res.send(html);
})

//RESR API
app.get("/api/users", async(req, res) => {
    const allDBUsers = await User.find({});

    res.setHeader("X-myName", "Himanshu_Gupta"); //Custom header
    //Always add X to custom headers
   
    return res.json(allDBUsers);
})
// for(let i = 1; i <= 1000; i++){
// app.get(`/api/users/${i}`, (req, res)=> {
//    res.send(`Hello from ${i}`);

// })
// }

app
    .route("/api/users/:id")
    .get( async (req, res) => {
        const user = await User.findById(req.params.id);
        const id = Number(req.params.id);
        
        if (!user) return res.status(404).json({ error: "user not found" })
        return res.json(user);
    })
    .patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, {lastName:"changed"});
        // TO DO: Edit the User with ID
        return res.json({ status: "success" })
    })
    .delete( async(req, res) => {
        // TO DO: Delete the User with ID
        await User.findByIdAndDelete(req.params.id);
        return res.json({ status: "success" })
    })
// app.get("/api/users/:id", (req, res)=> {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

app.post("/api/users", async (req, res) => {
    // TO DO: Create New User
    const body = req.body;
    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName:  body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });
    
    console.log("result", result);
    return res.status(201).json({msg: "success"})
});

// app.patch("/api/users/:id", (req, res) => {
//     // TO DO: Edit the User with ID
//     return res.json({status: "pending"})
// })

// app.delete("/api/users/:id", (req, res) => {
//     // TO DO: Delete the User with ID
//     return res.json({status: "pending"})
// })


app.listen(PORT, () => console.log(`server listening to port ${PORT}`));