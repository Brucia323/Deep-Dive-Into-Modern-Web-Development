import { useState } from 'react'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => {
    if (event.type === 'click') {
      return setValue('')
    }
    setValue(event.target.value)
  }

  return { type, value, onChange }
}
