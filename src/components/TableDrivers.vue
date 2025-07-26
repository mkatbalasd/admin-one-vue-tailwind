<script setup>
import { onMounted } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { useDriversStore } from '@/stores/drivers'

const emit = defineEmits(['edit'])

const store = useDriversStore()

onMounted(() => {
  store.fetchDrivers()
})

function editDriver(driver) {
  emit('edit', driver)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Identity Number</th>
        <th>Facility</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="driver in store.drivers" :key="driver.DriverID">
        <td>{{ driver.DriverID }}</td>
        <td>{{ driver.FirstName }}</td>
        <td>{{ driver.LastName }}</td>
        <td>{{ driver.IdentityNumber }}</td>
        <td>{{ driver.FacilityID }}</td>
        <td>
          <BaseButton color="info" label="Edit" small @click="editDriver(driver)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
