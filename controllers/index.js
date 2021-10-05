const {Router} = require('express');
const apiController = require('./api');

var router = Router();
router.use('/api', apiController);

module.exports = router