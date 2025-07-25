import API from './api'

export const getDriverCards = () => API.get('/driverCards')
export const addDriverCard = (payload) => API.post('/driverCards', payload)
export const updateDriverCard = (id, payload) => API.put(`/driverCards/${id}`, payload)
