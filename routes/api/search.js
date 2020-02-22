const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Listing = require('../../models/Listing.model');


  
router.route('/').post((req, res) => {
    const term = req.body.term;

    Listing.find({ $text: {$search: term }}, function(err, result) {
        if (err) throw err;
        if (result) {
            res.json(result)
        } else {
            res.send(JSON.stringify({
                error : 'Error'
            }))
        }
    })
    .limit(20);

});

module.exports = router;
