import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  getVehicles,
  addVehicle,
  updateVehicle as apiUpdate,
  deleteVehicle as apiDelete,
} from '@/api/vehicles'

export const useVehiclesStore = defineStore('vehicles', () => {
  const vehicles = ref([])

  async function fetchVehicles() {
    try {
      const { data } = await getVehicles()
      vehicles.value = data
    } catch (err) {
      console.error(err)
    }
  }

  async function createVehicle(payload) {
    try {
      const { data } = await addVehicle(payload)
      vehicles.value.push(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function updateVehicle(id, payload) {
    try {
      const { data } = await apiUpdate(id, payload)
      const index = vehicles.value.findIndex((v) => v.VehicleID === id || v.ID === id)
      if (index !== -1) {
        vehicles.value[index] = data
      } else {
        vehicles.value.push(data)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async function deleteVehicle(id) {
    try {
      await apiDelete(id)
      const index = vehicles.value.findIndex((v) => v.VehicleID === id || v.ID === id)
      if (index !== -1) {
        vehicles.value.splice(index, 1)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return { vehicles, fetchVehicles, createVehicle, updateVehicle, deleteVehicle }
})
