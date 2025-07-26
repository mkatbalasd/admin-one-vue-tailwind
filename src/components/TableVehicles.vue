<script setup>
import { onMounted, computed, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BasePagination from '@/components/BasePagination.vue'
import { useVehiclesStore } from '@/stores/vehicles'

const emit = defineEmits(['edit'])

const store = useVehiclesStore()

onMounted(() => {
  store.fetchVehicles()
})

const perPage = ref(10)
const currentPage = ref(0)

const items = computed(() => store.vehicles)

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1),
  ),
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

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
      <tr v-for="vehicle in itemsPaginated" :key="vehicle.ID">
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
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BasePagination v-model="currentPage" :total="numPages" />
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
