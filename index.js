const express = require('express');
const users = require("./MOCK_DATA.json");
const app = express();

const PORT = 5050;


//ROUTES
app.get("/", (req, res)=>{
    return res.send("Welcome to home page of REST API project");
})
app.get("/users", (req, res)=>{
    const html = `
    <ul>
    ${users.map((user_email) => `<li> ${user_email.email} </li>`).join("   ")}
    </ul>`
    ;
    res.send(html);
})

//RESR API
app.get("/api/users", (req, res) =>{
    res.json(users);
})
for(let i = 1; i <= 1000; i++){
app.get(`/api/users/${i}`, (req, res)=> {
   res.send(`Hello from ${i}`);
    
})
}


app.listen(PORT, ()=> console.log(`server listening to port ${PORT}`));