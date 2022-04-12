import './App.css'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = props => {
  return <h1>{props.course.name}</h1>
}

const Content = props => {
  return (
    <div>
      {props.course.parts.map((part, index) => {
        return <Part key={index} part={part} />
      })}
    </div>
  )
}

const Part = props => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )
}

const Total = props => {
  let exercises = 0
  props.course.parts.forEach(part => {
    exercises += part.exercises
  })

  return <p>Number of exercises {exercises}</p>
}

export default App
