import API from './api'

export const getFacilities = () => API.get('/facilities')
export const addFacility = (payload) => API.post('/facilities', payload)
