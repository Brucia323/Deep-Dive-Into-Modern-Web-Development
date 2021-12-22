import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
        .get(baseUrl)
        .then(response => {
            return response.data
        })
}

const create = newObject => {
    return axios
        .post(baseUrl, newObject)
        .then(response => {
            return response.data
        })
}

const deletePerson = id => {
    return axios
        .delete(`${baseUrl}/${id}`)
        .then(response => {
            return response.status
        })
}

const update = newObject => {
    return axios
        .put(`${baseUrl}/${newObject.id}`, newObject)
        .then(response => {
            return response.data
        })
}

export default { getAll, create, deletePerson, update }