const express = require("express");
const router = express.Router();

router.get("/login",(req,res) => {
    res.render("routes/auth/login",{
        title : 'Login',
    });
});

router.get("/sign-up",(req,res) => {
    res.render("routes/auth/signup");
});


module.exports = router;