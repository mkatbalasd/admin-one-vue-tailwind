import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getLicenseTypes } from '@/api/licenseTypes'

export const useLicenseTypesStore = defineStore('licenseTypes', () => {
  const licenseTypes = ref([])

  async function fetchLicenseTypes() {
    try {
      const { data } = await getLicenseTypes()
      licenseTypes.value = data
    } catch (err) {
      console.error(err)
    }
  }

  return { licenseTypes, fetchLicenseTypes }
})
