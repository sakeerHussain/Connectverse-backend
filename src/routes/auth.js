const express = require("express");
const router = express.Router();
const {signup, login} = require('../controllers/authController');

// Route this is for checking purpose only
router.get("/", (req,res) => {
    res.status(200).send("Get all user");
});

//user signup route
router.post("/signup", signup );

//user login route
router.post("/login", login );



module.exports = router;

