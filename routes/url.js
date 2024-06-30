const express = require('express');
const { handelgenerateshortUrls,handelgetanalytics } = require('../controler/url')

const router = express.Router();

router.post('/', handelgenerateshortUrls)
router.get('/analytics/:shortId',handelgetanalytics)
module.exports = router;  