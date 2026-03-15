const express = require('express');
const router = express.Router();

router.get("/uv", async (req, res) => {
    clg("Request made to postgress/uv api")
    const {lat, lon} = req.query
    clg("User Location is: ", lat, lon)
    try {
        const uvResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY }`
        )

        res.json(uvResponse.data)
        
    } catch (error) {
        res.status(500).json({error: "UV fetch failed"})
        
    }
})


module.exports = router;