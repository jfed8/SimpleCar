const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User.model');


// @route           POST api/users/create
// @description     Create New User
// @access          public
router.post('/create',
    [
        // User details validations
        check('email', 'Valid email address required').isEmail(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: "User already exists with this email" }] });
            }

            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const email = req.body.email;
            const displayName = req.body.displayName;
            const password = req.body.password;
            

            const newUser = new User({
                firstName,
                lastName,
                email,
                displayName,
                password
            });

            const salt = await bcrypt.genSalt();
            newUser.password = await bcrypt.hash(password, salt);
            await newUser.save()
                .then(() => res.json('User added!'))
                .catch(err => res.status(400).json('Error: ' + err));
        } catch(err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }


        
    }
);

module.exports = router;
