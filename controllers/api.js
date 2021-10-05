const {Router} = require('express');

var router = Router();

router.get('/boston', async(req, res) => {
    return res.send('../data/boston-housing.csv');
});


module.exports = router