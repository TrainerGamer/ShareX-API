const express = require("express");
const app = express();
const helmet = require("helmet");
const cors = require("cors");
const fileUpload = require("express-fileupload");
require('dotenv').config()

const images = require("./routes/images");

app.set('views', __dirname + '/views')
app.set('view engine', 'pug')

app.use(fileUpload());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/", images);
app.use('/static', express.static(__dirname + '/static'))

module.exports = app.listen(process.env.APP_PORT, () => console.log(`The API is now running on port ${process.env.APP_PORT}`));