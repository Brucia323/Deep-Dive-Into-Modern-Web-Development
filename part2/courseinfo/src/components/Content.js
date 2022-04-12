import Part from './Part'

const Content = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)

  return (
    <div>
      {parts.map(part => {
        return <Part key={part.id} part={part} />
      })}
      <p>
        <b>total of {total} exercises</b>
      </p>
    </div>
  )
}

export default Content
