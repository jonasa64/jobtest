const express = require('express');
const router = express.Router();
const userMapper = require('../../mapper/userMapper');

router.get("/", (req, res) => {
userMapper.all().then(db=> {
    res.status(200).json(db);
}).catch(err => res.status(500).json({error: "faild to fecth data form the server"}))

});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    userMapper.single(id).then(db => res.status(200).json({user: db}))
    .catch(err =>  res.status(500).json({error: "faild to fecth data form the server"}));
})

router.delete("/:id", (req, res) => {
    userMapper.delete(req.params.id).then(db => {
        res.status(200).json({message : "user is delete"});
    }).catch(err => res.status(500).json({error: "faild to fecth data form the server"}) )
});


router.post("/insert", (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const mail = req.body.mail;
    const password = req.body.password;
    userMapper.insert(firstName, lastName, mail, password).then(db => res.status(201).json(db))
    .catch(err => res.status(500).json({error: "faild to fecth data form the server"}) )
});



router.put("/edit/:id", (req, res) => {
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const mail = req.body.mail;
    const password = req.body.password;
    const id = req.params.id;
    userMapper.edit(firstName,lastName,mail, password, id).then(db => res.status(200).json(db))
    .catch(err=> res.status(500).json({error: "faild to fecth data form the server"}) );
});




module.exports = router;