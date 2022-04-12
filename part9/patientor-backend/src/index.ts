import express, { json } from 'express'
import diagnoseRouter from './routes/diagnoses'
import patientRouter from './routes/patients'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(json())

const PORT = 3001

app.get('/api/ping', (_req, res) => {
  res.send('Patientor')
})

app.use('/api/diagnoses', diagnoseRouter)
app.use('/api/patients', patientRouter)

app.listen(PORT)
