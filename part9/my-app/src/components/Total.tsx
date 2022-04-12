import React from 'react'

const Total = ({
  courseParts,
}: {
  courseParts: { name: string; exerciseCount: number }[]
}) => {
  return (
    <p>
      Number of exercises{' '}
      {courseParts.reduce(
        (
          carry,
          part: {
            name: string
            exerciseCount: number
          }
        ) => carry + part.exerciseCount,
        0
      )}
    </p>
  )
}

export default Total
