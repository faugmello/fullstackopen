const Persons = ({persons, handleExclude}) => (
    <>{persons.map(person => <Person key={person.id} person={person} handleExclude={handleExclude} /> )}</>
)

const Person = ({person, handleExclude}) => (
    <p>{person.name} {person.number} <button onClick={() => handleExclude(person.id)}>delete</button></p>
)

export default Persons
