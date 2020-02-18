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

            const first_name = req.body.first_name;
            const last_name = req.body.last_name;
            const email = req.body.email;
            const display_name = req.body.display_name;
            const password = req.body.password;
            

            const newUser = new User({
                first_name,
                last_name,
                email,
                display_name,
                password
            });

            const salt = await bcrypt.genSalt();
            newUser.password = await bcrypt.hash(password, salt);
            await newUser.save()
                // .then(() => res.json('User added!'))
                // .catch(err => res.status(400).json('Error: ' + err));

            const payload = {
                newUser: {
                    id: newUser.id
                }
            }

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 720000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
            
        } catch(err) {
            console.log(err.message);
            res.status(500).send("Server Error");
        }
        
    }
);

module.exports = router;
