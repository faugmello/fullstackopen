import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import services from "./services";

const App = () => {
    const [filter, setFilter] = useState('')
    const [persons, setPersons] = useState([])
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
            alert('Fill in both the name and the number!')
        } else if (newNameIsAlreadyOnThePhonebook) {
            alert(`${newName} is already added to phonebook`)
            clearForm()
        } else {
            const newPerson = { name: newName, number: newNumber }
            services.create(newPerson)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson))
                    setFilteredPersons(persons.concat(newPerson))
                    clearForm()
                })
        }
    }

    const clearForm = () => {
        setNewName('')
        setnewNumber('')
    }

    useEffect(() => {
        services.getAll()
            .then(persons => {
                setPersons(persons)
                setFilteredPersons(persons)
            })
    }, [])

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
