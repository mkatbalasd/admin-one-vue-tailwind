import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getDrivers,
  addDriver,
  updateDriver as apiUpdate,
  deleteDriver as apiDelete,
} from '@/api/drivers'

export const useDriversStore = defineStore('drivers', () => {
  const drivers = ref([])

  async function fetchDrivers() {
    try {
      const { data } = await getDrivers()
      drivers.value = data
    } catch (err) {
      console.error(err)
    }
  }

  async function createDriver(payload) {
    try {
      const { data } = await addDriver(payload)
      drivers.value.push(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function updateDriver(id, payload) {
    try {
      const { data } = await apiUpdate(id, payload)
      const index = drivers.value.findIndex((d) => d.DriverID === id || d.ID === id)
      if (index !== -1) {
        drivers.value[index] = data
      } else {
        drivers.value.push(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function deleteDriver(id) {
    try {
      await apiDelete(id)
      const index = drivers.value.findIndex((d) => d.DriverID === id || d.ID === id)
      if (index !== -1) {
        drivers.value.splice(index, 1)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return { drivers, fetchDrivers, createDriver, updateDriver, deleteDriver }
})
