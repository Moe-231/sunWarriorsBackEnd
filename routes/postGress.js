const express = require('express');
const router = express.Router();
const pool = require('../db')


router.get("/risklevel", async (req, res) => {
    console.log("Api Req Made to risklevel", req.query.index)
    const uvIndex = Math.floor(parseFloat(req.query.index))

    try {
        const query = `
        SELECT * FROM uv_risk_level
        WHERE $1 >= uv_min AND $1 <= uv_max;
        `;
        const result = await pool.query(query, [uvIndex])
        if(result.rows.length > 0) {
            res.status(200).json(result.rows[0])
        } else {
            res.status(404).json({ message: 'No Data Found for the give UV'})
        }   
    } catch (error) {
        console.log("Error in riskLevel API", error)
        res.status(500).send("Server Error")    
    }
})

router.get("/uvrecomendation", async (req, res) => {
    console.log("API req made to UV Recomendation route", req.query.index)
    const uvIndex = Math.floor(parseFloat(req.query.index))
    console.log(uvIndex)
    try {
        const query = `
    SELECT r.risk_level_id, r.level_name, r.uv_min, r.uv_max, rec.item_name, rec.item_description
    FROM uv_risk_level r
    JOIN clothing_recommendation rec
    ON r.risk_level_id = rec.risk_level_id
    WHERE $1 >= r.uv_min AND $1 <= r.uv_max
    `;

    const result = await pool.query(query, [uvIndex])
    if (result.rows.length > 0) {
            res.status(200).json(result.rows[0])
        } else {
            res.status(404).json({ message: "No data found for the given UV index" })
        }
        
    } catch (error) {
        console.log("Error in recomendation API", error)
        res.status(500).send("Server Error")     
    }
})

router.get("/cancerreport", async (req, res) => {
    console.log("Request made to cancer report API")
    try {
        const result = await pool.query(`
           WITH YouthTable AS (
           SELECT cancer_type, age_group, SUM(incidence_count) as total_cases 
           FROM cancer_incidence
           WHERE age_group like '%15%19%'
           GROUP BY cancer_type, age_group
           )
           SELECT cancer_type, sum(total_cases) as final_total
           FROM YouthTable
           GROUP BY cancer_type`)
            
        res.status(200).json(result.rows)    
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Database query failed"})
        
    }
})





module.exports = router;