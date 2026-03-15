const express = require('express');
const router = express.Router();
const pool = require('../db')


router.get("/risklevel", async (req, res) => {
    console.log("Api Req Made to risklevel", req.query.index)
    const uvIndex = Math.floor(parseFloat(req.query.index))

    console.log("Request made to cancer incidence")
    try {
        const query = `
        SELECT * FROM public.uv_risk_level
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

router.get("/cancerincidence", async (req, res) => {
    console.log("Request made to cancer incidence")
    try {
        const result = await pool.query(`
           SELECT cancer_type, SUM(incidence_count) as total_cases 
           FROM cancer_incidence
           GROUP BY cancer_type
           ORDER BY total_cases DESC
            `)
            
        res.status(200).json(result.rows)    
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Database query failed"})
        
    }
})





module.exports = router;