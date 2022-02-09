import express from "express"
import mysql2 from "mysql2/promise"
import cors from "cors"

const PORT = 4000

const db = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    database: 'morbidity',
    password: ''
})

const app = express()

const dbQuery = `
SELECT statistics.date AS date, territory.parent_id AS parent_id, territory.name AS territory, hospital.name AS hospital, disease.name AS disease, statistics.patients AS patients, statistics.issued AS issued, statistics.issued - statistics.patients AS trend 
FROM territory 
JOIN hospital ON territory.id = hospital.terr_id 
JOIN statistics ON statistics.hospital_id = hospital.id 
JOIN disease ON statistics.disease_id = disease.id
ORDER BY date DESC`

app.use(cors())

app.get('/', async (req, res) => {
    try {
        const data = await db.query(dbQuery)
        res.send(data[0])
    } catch (error) {
        console.error('Error >>', error)
    }
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}....`)
})