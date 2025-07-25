import API from './api'

export const getBrands = () => API.get('/brands')
export const addBrand = (payload) => API.post('/brands', payload)
