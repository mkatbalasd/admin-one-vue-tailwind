import API from './api'

export const getDrivers = () => API.get('/drivers')
export const addDriver = (payload) => API.post('/drivers', payload)
