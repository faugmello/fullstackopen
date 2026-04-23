import {useState} from 'react'
import {clear} from "@testing-library/user-event/dist/clear";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [filter, setFilter] = useState('')
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
    ])
    const [filteredPersons, setFilteredPersons] = useState(persons)
    const [newName, setNewName] = useState('')
    const [newNumber, setnewNumber] = useState('')

    const handleFilterChange = (event) => {
        const newFilter = event.target.value
        setFilter(newFilter)
        const filtered = persons.filter(person => person.name.toLowerCase().includes(newFilter))
        setFilteredPersons(filtered)
    }

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNewNumberChange = (event) => {
        setnewNumber(event.target.value)
    }

    const submitNewPerson = (event) => {
        event.preventDefault()
        const newNameIsAlreadyOnThePhonebook = persons.some(person => person.name === newName)
        const isNameFilled = typeof newName === 'string' && newName.trim().length > 0
        const isNumberFilled = typeof newNumber === 'string' && newNumber.trim().length > 0
        if (!isNameFilled || !isNumberFilled) {
            alert('Fill in both the name and the pwnumberhone!')
        } else if (newNameIsAlreadyOnThePhonebook) {
            alert(`${newName} is already added to phonebook`)
            clearForm()
        } else {
            const updatedPersons = [...persons, {name: newName, number: newNumber}]
            setPersons(updatedPersons)
            setFilteredPersons(updatedPersons)
            clearForm()
        }
    }

    const clearForm = () => {
        setNewName('')
        setnewNumber('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilterChange={handleFilterChange} />
            <h3>add a new</h3>
            <PersonForm
                newName={newName}
                handleNewNameChange={handleNewNameChange}
                newNumber={newNumber}
                handleNewNumberChange={handleNewNumberChange}
                submitNewPerson={submitNewPerson} />
            <h3>Numbers</h3>
            <Persons persons={filteredPersons} />
        </div>
    )
}

export default App
