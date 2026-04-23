import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    const submitNewName = (event) => {
        event.preventDefault()
        const updatedPersons = [...persons]
        updatedPersons.push({ name: newName })
        setPersons(updatedPersons)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={submitNewName}>
                <div>
                    name: <input value={newName} onChange={handleNewNameChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            { persons.map(person => <p key={person.name}>{person.name}</p>) }
        </div>
    )
}

export default App
