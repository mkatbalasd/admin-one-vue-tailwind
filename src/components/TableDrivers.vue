<script setup>
import { onMounted, computed, ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BasePagination from '@/components/BasePagination.vue'
import { useDriversStore } from '@/stores/drivers'

const emit = defineEmits(['edit'])

const store = useDriversStore()

onMounted(() => {
  store.fetchDrivers()
})

const perPage = ref(10)
const currentPage = ref(0)

const items = computed(() => store.drivers)

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1),
  ),
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

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
      <tr v-for="driver in itemsPaginated" :key="driver.DriverID">
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
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BasePagination v-model="currentPage" :total="numPages" />
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
