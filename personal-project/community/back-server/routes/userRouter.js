const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.post("/signup", userController.signupUser);

router.delete("/", (req, res, next) => {
    res.json({"message" : "DELETE request to the test page"});
})

module.exports = router;