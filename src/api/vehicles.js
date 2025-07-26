import API from './api'

export const getVehicles = () => API.get('/vehicles')
export const addVehicle = (payload) => API.post('/vehicles', payload)
export const updateVehicle = (id, payload) => API.put(`/vehicles/${id}`, payload)
export const deleteVehicle = (id) => API.delete(`/vehicles/${id}`)
