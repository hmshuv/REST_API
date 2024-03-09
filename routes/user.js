const express = require('express');

const router = express.Router();

router.get("/", (req, res) => {
    return res.send("Welcome to home page of REST API project");
})

// router.get("/users", async (req, res) => {
//     const allDBUsers = await User.find({})
//     const html = `
//     <ul>
//     ${allDBUsers.map((user) => `<li> ${user.email} - ${user.firstName} </li>`).join("   ")}
//     </ul>`
//         ;
//     res.send(html);
// })

//RESR API
router.get("/", async(req, res) => {
    const allDBUsers = await User.find({});

    res.setHeader("X-myName", "Himanshu_Gupta"); //Custom header
    //Always add X to custom headers
   
    return res.json(allDBUsers);
})
// for(let i = 1; i <= 1000; i++){
// router.get(`/api/users/${i}`, (req, res)=> {
//    res.send(`Hello from ${i}`);

// })
// }

router
    .route("/:id")
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
// router.get("/api/users/:id", (req, res)=> {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

router.post("/", async (req, res) => {
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

module.exports = router;