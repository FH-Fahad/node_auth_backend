const router = require('express').Router();
const { User, validate2 } = require('../database/models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
    try {
        const { error } = validate2(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(401).send({ message: 'Invalid Email or Password' });

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) return res.status(401).send({ message: 'Invalid Email or Password' });


        try {
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
            res.status(200).send({ "token": token, user, message: 'Login Successful' });
        } catch (err) {
            res.status(500).send({ message: "Server Error" });
        }
    }
    catch (err) {
        res.status(500).send({ message: "Server Error" });
    }
});

module.exports = router;
