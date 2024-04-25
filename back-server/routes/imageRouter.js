const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imageUrl = path.join(__dirname, '..', 'uploads', imageName);
    res.sendFile(imageUrl);
})

module.exports = router;