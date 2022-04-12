import diagnosesData from '../../data/diagnoses.json'

import { DiagnoseEntry } from '../types'

const diagnoses: Array<DiagnoseEntry> = diagnosesData

const getEntries = (): Array<DiagnoseEntry> => {
  return diagnoses
}

const addEntry = () => {
  return null
}

export default { getEntries, addEntry }
