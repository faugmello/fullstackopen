import {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import services from "./remoteServices";
import Notification from "./components/Notification";

const App = () => {
    const [filter, setFilter] = useState('')
    const [persons, setPersons] = useState([])
    const [filteredPersons, setFilteredPersons] = useState(persons)
    const [newName, setNewName] = useState('')
    const [newNumber, setnewNumber] = useState('')
    const [notification, setNotification] = useState({message: '', type: ''})

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
            if (newNumber === persons.find(person => person.name === newName).number) {
                alert(`${newName} is already added to phonebook`)
            } else {
                if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
                    const updatedPerson = persons.find(person => person.name === newName)
                    updatedPerson['number'] = newNumber
                    services.update(updatedPerson)
                        .then(updatedPerson => {
                            const updatedPersons = persons.filter(person => person.id !== updatedPerson.id)
                            updatedPersons.push(updatedPerson)
                            setPersons(updatedPersons)
                            if (updatedPerson.name.includes(filter)) {
                                const updatedFilteredPersons = filteredPersons.filter(person => person.id !== updatedPerson.id)
                                updatedFilteredPersons.push(updatedPerson)
                                setFilteredPersons(updatedFilteredPersons)
                            }
                            setNotification(
                                {
                                    message: `Updated ${updatedPerson.name}`,
                                    type: 'success'
                                }
                            )
                            setTimeout(() => {
                                setNotification({message: '', type: ''})
                            }, 5000)
                        })
                        .catch(() => {
                            setNotification(
                                {
                                    message: `Error while trying to update ${newName}`,
                                    type: 'error'
                                }
                            )
                            setTimeout(() => {
                                setNotification({message: '', type: ''})
                            }, 5000)
                        })
                }
            }
            clearForm()
        } else {
            const newPerson = {name: newName, number: newNumber}
            services.create(newPerson)
                .then(newPerson => {
                    setPersons(persons.concat(newPerson))
                    if (newPerson.name.includes(filter)) {
                        setFilteredPersons(filteredPersons.concat(newPerson))
                    }
                    clearForm()
                    setNotification(
                        {
                            message: `Added ${newPerson.name}`,
                            type: 'success'
                        }
                    )
                    setTimeout(() => {
                        setNotification({message: '', type: ''})
                    }, 5000)
                })
                .catch(() => {
                    setNotification(
                        {
                            message: `Error while trying to add ${newName}`,
                            type: 'error'
                        }
                    )
                    setTimeout(() => {
                        setNotification({message: '', type: ''})
                    }, 5000)
                })
        }
    }

    const clearForm = () => {
        setNewName('')
        setnewNumber('')
    }

    const handleExclude = id => {
        const person = persons.find(person => person.id === id)
        if (window.confirm(`Delete ${person.name}?`)) {
            services.exclude(id)
                .then(id => {
                    setPersons(persons.filter(person => person.id !== id))
                    setFilteredPersons(filteredPersons.filter(person => person.id !== id))
                    setNotification(
                        {
                            message: `${person.name} was deleted`,
                            type: 'success'
                        }
                    )
                    setTimeout(() => {
                        setNotification({message: '', type: ''})
                    }, 5000)
                })
                .catch(() => {
                    setNotification(
                        {
                            message: `Error while trying to delete ${newName}`,
                            type: 'error'
                        }
                    )
                    setTimeout(() => {
                        setNotification({message: '', type: ''})
                    }, 5000)
                })
        }
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
            <Notification notification={notification}/>
            <Filter filter={filter} handleFilterChange={handleFilterChange}/>
            <h3>add a new</h3>
            <PersonForm
                newName={newName}
                handleNewNameChange={handleNewNameChange}
                newNumber={newNumber}
                handleNewNumberChange={handleNewNumberChange}
                submitNewPerson={submitNewPerson}/>
            <h3>Numbers</h3>
            <Persons persons={filteredPersons} handleExclude={handleExclude}/>
        </div>
    )
}

export default App
