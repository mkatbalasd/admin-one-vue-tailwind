import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDriverCards, addDriverCard, updateDriverCard as apiUpdate } from '@/api/driverCards'
import { getDrivers } from '@/api/drivers'
import { getFacilities } from '@/api/facilities'

export const useDriverCardsStore = defineStore('driverCards', () => {
  const cards = ref([])

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
      cards.value = await mergeCardData(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function createDriverCard(payload) {
    try {
      const dataPayload = { ...payload }
      delete dataPayload.addingDate
      delete dataPayload.LastUpdate
      const { data } = await addDriverCard(dataPayload)
      const [card] = await mergeCardData([data])
      cards.value.push(card)
    } catch (err) {
      console.error(err)
    }
  }

  async function updateDriverCard(id, payload) {
    try {
      const dataPayload = { ...payload }
      delete dataPayload.addingDate
      delete dataPayload.LastUpdate
      const { data } = await apiUpdate(id, dataPayload)
      const [card] = await mergeCardData([data])
      const index = cards.value.findIndex((c) => c.ID === id)
      if (index !== -1) {
        cards.value[index] = card
      } else {
        cards.value.push(card)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return { cards, fetchDriverCards, createDriverCard, updateDriverCard }
})
