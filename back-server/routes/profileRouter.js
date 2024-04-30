const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:profileName', (req, res) => {
    const profileName = req.params.profileName;
    const profileUrl = path.join(__dirname, '..', 'profiles', profileName);
    res.sendFile(profileUrl);
})

module.exports = router;