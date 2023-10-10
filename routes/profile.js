const router = require('express').Router();
const { User } = require('../database/models/user');

router.get('/account', async (req, res) => {
    const email = req.query.email;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;