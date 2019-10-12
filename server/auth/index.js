const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        message: "ok from router"
    })
})

router.post('/login', (req, res) => {
    console.log(req.body);


})

module.exports = router