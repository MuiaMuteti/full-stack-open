const Person = ({name, number}) => {
    return (
        <p>{name} {number}</p>
    )
}

const Persons = ({contacts}) => {
    return (
    <div>
        {contacts.map(person => 
            <Person key={person.id} name={person.name} number={person.number}/> 
        )}
    </div>
    )
}

export default Persons