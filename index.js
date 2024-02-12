const express = require('express');
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();

const PORT = 5050;

//Middleware or Pluggin

app.use(express.urlencoded({ extended: false }));  //Express Middleware

app.use((req, res, next) => {
    console.log("Hello from middleware 1");
    next();
});

app.use((req, res, next) => {
    console.log("Hello from middleware 2");
    next();
});

//ROUTES
app.get("/", (req, res) => {
    return res.send("Welcome to home page of REST API project");
})
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((user_email) => `<li> ${user_email.email} </li>`).join("   ")}
    </ul>`
        ;
    res.send(html);
})

//RESR API
app.get("/api/users", (req, res) => {
    res.json(users);
})
// for(let i = 1; i <= 1000; i++){
// app.get(`/api/users/${i}`, (req, res)=> {
//    res.send(`Hello from ${i}`);

// })
// }

app
    .route("/api/users/:id")
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id);
        return res.json(user);
    })
    .patch((req, res) => {
        // TO DO: Edit the User with ID
        return res.json({ status: "pending" })
    })
    .delete((req, res) => {
        // TO DO: Delete the User with ID
        return res.json({ status: "pending" })
    })
// app.get("/api/users/:id", (req, res)=> {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

app.post("/api/users", (req, res) => {
    // TO DO: Create New User
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: user.length + 1 });
    });
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