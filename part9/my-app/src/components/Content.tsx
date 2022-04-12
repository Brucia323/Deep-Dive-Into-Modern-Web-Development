import React from 'react'
import { CoursePart } from '../App'
import Part from './Part'

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part, index) => {
        return <Part coursePart={part} key={index} />
      })}
    </>
  )
}

export default Content
