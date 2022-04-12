const Person = ({ person, onClick }) => {
  return (
    <p>
      {person.name} {person.number}{' '}
      <button
        onClick={() => {
          onClick(person.id, person.name)
        }}
      >
        delete
      </button>
    </p>
  )
}

export default Person
