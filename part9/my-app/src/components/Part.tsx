import { CoursePart } from '../App'
import React from 'react'

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <em>{coursePart.description}</em>
        </p>
      )
    case 'groupProject':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          project exercises {coursePart.groupProjectCount}
        </p>
      )
    case 'submission':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <em>{coursePart.description}</em>
          <br />
          submit to {coursePart.exerciseSubmissionLink}
        </p>
      )
    case 'special':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          <em>{coursePart.description}</em>
          <br />
          required skils: {coursePart.requirements.join(', ')}
        </p>
      )
    default:
      return null
  }
}

export default Part
