/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = '/api/drones'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.error(error)
  }
}


export default { getAll }
