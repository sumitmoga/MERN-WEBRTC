const router = require('express').Router();

router.post('/api/send-otp', (req, res) => {
    res.send('hello from otp routes')
})


module.exports = router