import API from './api'

export const getFacilities = () => API.get('/facilities')
export const addFacility = (payload) => API.post('/facilities', payload)
export const searchFacilities = ({ search, limit, offset }) =>
  API.get('/facilities', { params: { search, limit, offset } })
