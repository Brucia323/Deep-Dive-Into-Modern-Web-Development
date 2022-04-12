import express from 'express'
import patientService from '../services/patientService'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries())
})

router.post('/', (_req, res) => {
  res.send('Saving a patient!')
})

router.get('/:id', (req, res) => {
  res.send(patientService.getPublicPatient(req.params.id))
})

export default router
