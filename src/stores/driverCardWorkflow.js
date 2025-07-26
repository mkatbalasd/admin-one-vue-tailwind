import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getFacilities, addFacility } from '@/api/facilities'
import { getDrivers, addDriver } from '@/api/drivers'
import { getDriverCards, addDriverCard, updateDriverCard } from '@/api/driverCards'

export const useDriverCardWorkflowStore = defineStore('driverCardWorkflow', () => {
  const facility = ref(null)
  const driver = ref(null)
  const card = ref(null)

  async function findFacility(identity) {
    const { data } = await getFacilities()
    facility.value = data.find((f) => f.IdentityNumber === identity) || null
    return facility.value
  }

  async function createFacility(payload) {
    const { data } = await addFacility(payload)
    facility.value = data
    return facility.value
  }

  async function findDriver(identity) {
    const { data } = await getDrivers()
    driver.value = data.find((d) => d.IdentityNumber === identity) || null
    return driver.value
  }

  async function createDriver(payload) {
    const { data } = await addDriver(payload)
    driver.value = data
    return driver.value
  }

  async function findDriverCard() {
    if (!driver.value) return null
    const { data } = await getDriverCards()
    card.value = data.find((c) => c.DriverID === driver.value.DriverID) || null
    return card.value
  }

  async function saveCard(payload) {
    const dataPayload = { ...payload }
    delete dataPayload.addingDate
    delete dataPayload.LastUpdate
    let response
    if (card.value && card.value.ID) {
      response = await updateDriverCard(card.value.ID, dataPayload)
    } else {
      response = await addDriverCard(dataPayload)
    }
    card.value = response.data
    return card.value
  }

  return {
    facility,
    driver,
    card,
    findFacility,
    createFacility,
    findDriver,
    createDriver,
    findDriverCard,
    saveCard,
  }
})
