import Person from "./Person"

const Persons = (props) => {
    return (
        props.persons.map((person) => {
            return (
                props.filter === ''
                    ? <Person key={person.id} person={person} />
                    : person.name.toLowerCase().indexOf(props.filter.toLowerCase()) !== -1 &&
                    <Person key={person.id} person={person} />
            )
        })
    )
}

export default Persons