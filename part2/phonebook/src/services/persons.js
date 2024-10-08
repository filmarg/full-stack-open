import axios from 'axios'

// const baseUrl = 'http://localhost:3001/persons'
const baseUrl = '/api/persons'

const getAll = () =>
      axios
      .get(baseUrl)
      .then(response => response.data)

const add = (newPerson) =>
      axios
      .post(baseUrl, newPerson)
      .then(response => response.data)

const update = (id, newPerson) =>
      axios
      .put(`${baseUrl}/${id}`, newPerson)
      .then(response => response.data)

const remove = (id) =>
      axios
      .delete(`${baseUrl}/${id}`)
      .then(response => response.data)

export default { getAll, add, update, remove }
