const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const rateLimit = require("express-rate-limit");
require('dotenv').config()

const uploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: process.env.MAX_UPLOADS
  });
router.use('/save/', uploadLimiter);

router.get('/', function (req, res) {
    res.render('index')
});

router.get(`/:name`, async (req, res) => {
    try {
        if (!fs.existsSync(__dirname + `/../../files/${req.params.name}`)) {
            return res.status(404).render("error_404");
        }

        if (req.query) return res.status(200).sendFile(path.resolve(__dirname + `/../../files/${req.params.name}`));
    } catch (err) {
        console.log(err);
        res.status(500).render("error_500");
    }
});

router.post("/save/:name", async (req, res) => {
    try {
        if (req.headers.token != process.env.TOKEN) {
            console.log('A request was made with an invalid token. A 401 Unauthorized Error was returned.')
            return res.status(401).render("error_401");
        }
        if (!req.body) {
            console.log('No file was provided for upload')
            return res.status(400).render("error_400");
        }
        if (fs.existsSync(__dirname + `/../../files/${req.params.name}`)) { 
            console.log(`The file '${req.params.name}' already exists. Please rename the file you are attempting to upload, or delete/rename the existing file.`)
            return res.status(400).render("error_400"); 
        }

        req.files['files[]'].mv(__dirname + `/../../files/${req.params.name}`)

        return res.status(200).json({ name: req.params.name });
    } catch (err) {
        console.log(err);
        res.status(500).render("error_500");
    }
});

module.exports = router;