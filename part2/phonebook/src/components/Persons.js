import Person from "./Person"

const Persons = ({ persons, filter,onClick }) => {
    return (
        persons.map((person) => {
            return (
                filter === ''
                    ? <Person key={person.id} person={person} onClick={onClick} />
                    : person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 &&
                    <Person key={person.id} person={person} onClick={onClick} />
            )
        })
    )
}

export default Persons