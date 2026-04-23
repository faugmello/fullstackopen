import {useState} from 'react'
import {clear} from "@testing-library/user-event/dist/clear";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', phone: '12345678'}
    ])
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const handleNewNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNewPhoneChange = (event) => {
        setNewPhone(event.target.value)
    }

    const submitNewPerson = (event) => {
        event.preventDefault()
        const newNameIsAlreadyOnThePhonebook = persons.some(person => person.name === newName)
        const isNameFilled = typeof newName === 'string' && newName.trim().length > 0
        const isPhoneFilled = typeof newPhone === 'string' && newPhone.trim().length > 0
        if (!isNameFilled || !isPhoneFilled) {
            alert('Fill in both the name and the phone!')
        } else if (newNameIsAlreadyOnThePhonebook) {
            alert(`${newName} is already added to phonebook`)
            clearForm()
        } else {
            setPersons([...persons, { name: newName, phone: newPhone }])
            clearForm()
        }
    }

    const clearForm = () => {
        setNewName('')
        setNewPhone('')
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={submitNewPerson}>
                <div>
                    name: <input value={newName} onChange={handleNewNameChange}/>
                </div>
                <div>
                    number: <input value={newPhone} onChange={handleNewPhoneChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            { persons.map(person => <p key={person.name}>{person.name} {person.phone}</p>) }
        </div>
    )
}

export default App
