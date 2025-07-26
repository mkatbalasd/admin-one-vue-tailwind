<script setup>
import { onMounted } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { useVehiclesStore } from '@/stores/vehicles'

const emit = defineEmits(['edit'])

const store = useVehiclesStore()

onMounted(() => {
  store.fetchVehicles()
})

function editVehicle(vehicle) {
  emit('edit', vehicle)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Plate Number</th>
        <th>Serial Number</th>
        <th>Facility</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vehicle in store.vehicles" :key="vehicle.ID">
        <td>{{ vehicle.ID }}</td>
        <td>{{ vehicle.PlateNumber }}</td>
        <td>{{ vehicle.SerialNumber }}</td>
        <td>{{ vehicle.FacilityID }}</td>
        <td>
          <BaseButton color="info" label="Edit" small @click="editVehicle(vehicle)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
