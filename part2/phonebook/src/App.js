import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

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
            axios.post('http://localhost:3001/persons', newPerson)
                .then((response) => {
                    setPersons(persons.concat(response.data))
                    setFilteredPersons(persons.concat(response.data))
                    clearForm()
                })
        }
    }

    const clearForm = () => {
        setNewName('')
        setnewNumber('')
    }

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then((response) => {
            setPersons(response.data)
            setFilteredPersons(response.data)
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
