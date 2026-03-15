const express = require('express');
const router = express.Router();
const pool = require('../db')

router.get("/cancerincidence", async (req, res) => {
    try {
        const result = await pool.query(`
           SELECT cancer_type, SUM(incidence_count) as total_cases 
           FROM cancerincidence
           GROUP BY cancer_type
           ORDER BY total_cases DESC
            `)
        res.json(result.rows)    
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Database query failed"})
        
    }
})


module.exports = router;