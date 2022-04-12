import patientsData from '../../data/patients.json'

import { NonSensitivePatientEntry, PatientEntry, PublicPatient } from '../types'

const patients: Array<PatientEntry> = patientsData

const getEntries = (): Array<PatientEntry> => {
  return patients
}

const getNonSensitiveEntries = (): Array<NonSensitivePatientEntry> => {
  return patients
}

const addEntry = () => {
  return null
}

const getPublicPatient = (id: string): PublicPatient | void => {
  for (const patient of patients) {
    if (patient.id === id) {
      return patient
    }
  }
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  getPublicPatient,
}
