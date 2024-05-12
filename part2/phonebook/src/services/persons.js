import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>
      axios
      .get(baseUrl)
      .then(response => response.data)

const add = (newPerson) =>
      axios
      .post(baseUrl, newPerson)
      .then(response => response.data)

export default { getAll, add }