import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getAll = () => axios.get(`${baseUrl}/api/persons`).then(response => response.data)

const create = newPerson => axios.post(`${baseUrl}/api/persons`, newPerson).then(response => response.data)

const exclude = id => axios.delete(`${baseUrl}/api/persons/${id}`).then(response => response.data.id)

const update = (updatedPerson) => axios.put(`${baseUrl}/api/persons/${updatedPerson.id}`, updatedPerson)
    .then(response => response.data)

export default { getAll, create, exclude, update }
