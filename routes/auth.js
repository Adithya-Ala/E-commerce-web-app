var express = require("express");
var router = express.Router();
const { signout,signup,signin,isSignedIn } = require("../controllers/auth.js");
const {check, validationResult} = require('express-validator');

router.post("/signup",[
    check("name","name should be atleast 3 chars").isLength({min : 3}),
    check("email","enter email correctly").isEmail(),
    check("password","password should contain mixed of chars ana digits").isLength({min : 3})
],signup);

router.post("/signin",[
    check("email","enter email correctly").isEmail(),
    check("password","password should contain mixed of chars ana digits").isLength({min : 3})
],signin);

router.get("/signout",signout);

router.get("/testroute", isSignedIn, (req,res) => {
    res.send(req.auth);
})


module.exports = router;