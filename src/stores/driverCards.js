import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDriverCards, addDriverCard, updateDriverCard as apiUpdate } from '@/api/driverCards'
import { getDrivers } from '@/api/drivers'
import { getFacilities } from '@/api/facilities'

export const useDriverCardsStore = defineStore('driverCards', () => {
  const driverCards = ref([])

  async function mergeCardData(rawCards) {
    try {
      const [driversRes, facilitiesRes] = await Promise.all([getDrivers(), getFacilities()])
      const drivers = driversRes.data
      const facilities = facilitiesRes.data
      return rawCards.map((c) => {
        const driver = drivers.find((d) => d.DriverID === c.DriverID)
        const facility = facilities.find((f) => f.FacilityID === c.FacilityID)
        return {
          ...c,
          driverName: driver ? `${driver.FirstName} ${driver.LastName}` : '',
          facilityName: facility ? facility.Name : '',
        }
      })
    } catch (err) {
      console.error(err)
      return rawCards
    }
  }

  async function fetchDriverCards() {
    try {
      const { data } = await getDriverCards()
      driverCards.value = await mergeCardData(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function createDriverCard(payload) {
    try {
      const { data } = await addDriverCard(payload)
      const [card] = await mergeCardData([data])
      driverCards.value.push(card)
    } catch (err) {
      console.error(err)
    }
  }

  async function updateDriverCard(id, payload) {
    try {
      const { data } = await apiUpdate(id, payload)
      const [card] = await mergeCardData([data])
      const index = driverCards.value.findIndex((c) => c.ID === id)
      if (index !== -1) {
        driverCards.value[index] = card
      } else {
        driverCards.value.push(card)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return { driverCards, fetchDriverCards, createDriverCard, updateDriverCard }
})
