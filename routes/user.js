const router = require('express').Router();
const { User, validate1 } = require('../database/models/user');
const bcrypt = require('bcrypt');

// Get All User
router.post('/register', async (req, res) => {
    try {
        const { error } = validate1(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(401).send({ message: 'Email already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new User({ ...req.body, password: hashedPassword, confirmPassword: hashedPassword }).save();
        res.status(201).send('User Registered Successfully');
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "Server Error" });
    }
});

module.exports = router;
