const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv')
const bodyParser = require("body-parser");
const postGress = require("./routes/postGress")
const openWeather = require("./routes/openWeather")

const app = express()

dotenv.config()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/postgress", postGress)
app.use("/openweather", openWeather)

const PORT = 8080
app.listen(PORT, () => {
    `Server is running on port ${PORT}`
})