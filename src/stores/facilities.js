import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getFacilities,
  addFacility,
  searchFacilities,
} from '@/api/facilities'

export const useFacilitiesStore = defineStore('facilities', () => {
  const facilities = ref([])

  async function fetchFacilities(options = null) {
    try {
      if (options && (options.search || options.limit || options.offset)) {
        const { data } = await searchFacilities(options)
        facilities.value = data
      } else {
        const { data } = await getFacilities()
        facilities.value = data
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function createFacility(payload) {
    try {
      const { data } = await addFacility(payload)
      facilities.value.push(data)
    } catch (err) {
      console.error(err)
    }
  }

  return { facilities, fetchFacilities, createFacility }
})
