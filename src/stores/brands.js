import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBrands, addBrand } from '@/api/brands'

export const useBrandsStore = defineStore('brands', () => {
  const brands = ref([])

  async function fetchBrands() {
    try {
      const { data } = await getBrands()
      brands.value = data
    } catch (err) {
      console.error(err)
    }
  }

  async function createBrand(payload) {
    try {
      const { data } = await addBrand(payload)
      brands.value.push(data)
    } catch (err) {
      console.error(err)
    }
  }

  return { brands, fetchBrands, createBrand }
})
