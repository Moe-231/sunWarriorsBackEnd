const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

router.get("/uv", async (req, res) => {
    console.log("Request made to openweather/uv api")
    const {lat, lon} = req.query
     console.log("User Location is: ", lat, lon)
    try {
        const uvResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
        )

        res.status(200).json(uvResponse.data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: error}) 
    }
})


module.exports = router;