import API from './api'

export const getDrivers = () => API.get('/drivers')
export const addDriver = (payload) => API.post('/drivers', payload)
export const updateDriver = (id, payload) => API.put(`/drivers/${id}`, payload)
export const deleteDriver = (id) => API.delete(`/drivers/${id}`)
