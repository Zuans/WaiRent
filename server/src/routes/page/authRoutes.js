const express = require("express");
const router = express.Router();
const tagModel = require('../../model/tag.model');


router.get("/login",(req,res) => {
    res.render("routes/auth/login",{
        title : 'Login',
    });
});

router.get("/sign-up",async (req,res) => {
    const allTag = await tagModel.getAllTag();
    res.render("routes/auth/signup", {
        allTag,
        title : "Signup"
    });
});

router.get("/logout",(req,res) => {
    res.clearCookie("token");
    res.redirect("/");
})


module.exports = router;