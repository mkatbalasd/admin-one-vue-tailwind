<script setup>
import { onMounted } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import { useFacilitiesStore } from '@/stores/facilities'

const emit = defineEmits(['edit'])

const store = useFacilitiesStore()

onMounted(() => {
  store.fetchFacilities()
})

function editFacility(facility) {
  emit('edit', facility)
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Identity</th>
        <th>Name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="facility in store.facilities" :key="facility.FacilityID">
        <td>{{ facility.FacilityID }}</td>
        <td>{{ facility.IdentityNumber }}</td>
        <td>{{ facility.Name }}</td>
        <td>
          <BaseButton color="info" label="Edit" small @click="editFacility(facility)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
