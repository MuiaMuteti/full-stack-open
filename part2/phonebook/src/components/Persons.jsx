const Person = ({name, number, removeContact}) => {
    return (
        <p>{name} {number} <button onClick={removeContact}>delete</button></p>
    )
}

const Persons = ({contacts, handleRemove }) => {
    return (
    <div>
        {contacts.map(person => 
            <Person 
                key={person.id} 
                name={person.name} 
                number={person.number} 
                removeContact={() => handleRemove(person.id)}
            /> 
        )}
    </div>
    )
}

export default Persons