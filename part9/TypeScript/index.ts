import express = require('express')
import calculateBmi from './bmiCalculator'
import calculatExercise from './exerciseCalculator'
const app = express()

app.use(express.json())

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const weight: number = Number(req.query.weight)
  const height: number = Number(req.query.height)
  const bmi: number = calculateBmi(height, weight)
  res.status(200).send(String(bmi))
})

app.post('/exercise', (req, res) => {
  const body = req.body
  const daily_exercises = body.daily_exercises
  const target = body.target
  res.status(201).send(calculatExercise(daily_exercises,target))
})

const PORT = 3002

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
