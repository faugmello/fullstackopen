import axios from 'axios'
const baseUrl = 'api/persons'

const getAll = () => axios.get(baseUrl).then(response => response.data)

const create = newPerson => axios.post(baseUrl, newPerson).then(response => response.data)

const exclude = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data.id)

const update = (updatedPerson) => axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    .then(response => response.data)

export default { getAll, create, exclude, update }
